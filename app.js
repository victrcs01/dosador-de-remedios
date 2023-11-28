const express = require('express');
const remedyRoutes = require('./controllers/remedyController');
const dispenserRoutes = require('./controllers/dispenserController');
const app = express();

app.use(express.json());

// Rotas para o CRUD de remédios
app.use('/remedies', remedyRoutes);

// Rotas para o gerenciamento do dispenser dos medicamentos
app.use('/dispenser', dispenserRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
