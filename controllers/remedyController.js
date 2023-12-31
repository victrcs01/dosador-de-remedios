const express = require('express');
const prisma = require('../models/db');

const router = express.Router();

// Listar todos os Remedy
router.get('/', async (req, res) => {
  try {
    const remedies = await prisma.remedy.findMany();
    res.json(remedies);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Buscar um Remedy por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const remedy = await prisma.remedy.findUnique({
      where: { id: parseInt(id) },
    });
    if (!remedy) {
      return res.status(404).json({ error: error });
    }
    res.json(remedy);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Criar um novo Remedy
router.post('/', async (req, res) => {
  const { name, frequency, amount_per_dose, notes, tube_identifier, remaining_doses, last_dose } = req.body;
  try {
    //const last_dose = '2023-11-28 15:30:00';
    const newRemedy = await prisma.remedy.create({
      data: {
        name,
        frequency,
        amount_per_dose, 
        notes, 
        tube_identifier: Number(tube_identifier),
        last_dose,
        remaining_doses
      },
    });
    res.status(201).json(newRemedy);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
});

// Atualizar um Remedy por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, frequency, amount_per_dose, notes, tube_identifier, last_dose, remaining_doses } = req.body;
  try {
    const updatedRemedy = await prisma.remedy.update({
      where: { id: parseInt(id) },
      data: {
        name,
        frequency,
        amount_per_dose, 
        notes, 
        tube_identifier: Number(tube_identifier),
        last_dose,
        remaining_doses
      },
    });
    res.json(updatedRemedy);
  } catch (error) {
    res.status(500).json({error: error });
  }
});

// Deletar um Remedy por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.remedy.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Medicamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
