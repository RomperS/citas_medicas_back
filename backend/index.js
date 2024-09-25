const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Importa las rutas
const authRoutes = require("./routes/auth");
const citasRouter = require("./routes/citas");
const pacienteRoutes = require("./routes/paciente");
const areaTrabajoRoutes = require("./routes/areaTrabajo");
const medicoRoutes = require("./routes/medico");

// Configura el middleware
app.use(cors());
app.use(bodyParser.json());

// Configura las rutas
app.use("/api/auth", authRoutes);
app.use("/api/citas", citasRouter);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/areas", areaTrabajoRoutes);
app.use("/api/medicos", medicoRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor", error: err.message });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
