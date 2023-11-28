const express = require('express');
const prisma = require('../models/db');

const router = express.Router();

// Lista se tiver algum remédio disponível
router.get('/availabeRemedy/', async (req, res) => {
  try {
    const remedies = await prisma.remedy.findMany();

    let availabeRemedy = {};

    for (let remedy of remedies) {
      const now = new Date();
      const { last_dose, doses_frequency} = remedy;
      const minutesDifference = Math.floor(Math.abs(now.getTime() - last_dose.getTime())/ (1000 * 60));
      if (minutesDifference > doses_frequency) {
        availabeRemedy = remedy;
        break;
      }
    }

    res.json(availabeRemedy);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os medicamentos' });
  }
});

// Atualizar um Remedy por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const remedy = await prisma.remedy.findUnique({
      where: { remedy_id: parseInt(id) },
    });

    const {name, doses_frequency, amount_per_dose, remedy_notes, tube_identifier, last_dose, remaining_doses} = remedy;

    const updatedRemedy = await prisma.remedy.update({
      where: { remedy_id: parseInt(id) },
      data: {
        name,
        doses_frequency,
        amount_per_dose, 
        remedy_notes, 
        tube_identifier,
        last_dose: new Date(),
        remaining_doses: remaining_doses - amount_per_dose
      },
    });
    res.json(updatedRemedy);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o medicamento' });
  }
});

module.exports = router;
