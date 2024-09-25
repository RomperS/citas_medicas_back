const citasModel = require("../models/citas");
const filtros = require("../filters/filtros");
const moment = require("moment");
const fs = require("fs");

exports.createCita = async (req, res) => {
  const citaData = req.body;

  try {
    // Validar la cita con filtros.js
    const validacionFechaHora = await filtros.filtroFechaHora(
      citaData.id_medico,
      citaData.fecha,
      citaData.hora
    );
    const existeCita = await filtros.existeCitaEnHorario(
      citaData.id_medico,
      citaData.fecha,
      citaData.hora
    );

    if (validacionFechaHora === "valida" && !existeCita) {
      // Registrar la cita si es válida
      const nuevaCita = await citasModel.createCita(citaData);
      res.status(201).json(nuevaCita);
    } else {
      // Retornar el mensaje de error
      const mensajeError = existeCita
        ? "Cita ya existe en el horario seleccionado"
        : `Cita no válida: ${validacionFechaHora}`;
      res.status(400).json({ message: mensajeError });
    }
  } catch (error) {
    console.error("Error al crear cita:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

exports.getAllCitas = async (req, res) => {
  const { id_area, id_paciente } = req.query;

  try {
    let citas;

    if (id_area || id_paciente) {
      citas = await citasModel.getCitasByFilter(id_area, id_paciente);
    } else {
      citas = await citasModel.getAllCitas();
    }

    // Formatear las fechas en la respuesta
    citas = citas.map((cita) => ({
      ...cita,
      fecha: formatDate(cita.fecha),
    }));

    res.json(citas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getCitaById = async (req, res) => {
  const citaId = req.params.id;

  try {
    const cita = await citasModel.getCitaById(citaId);
    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Formatear la fecha en la respuesta
    cita.fecha = formatDate(cita.fecha);
    res.json(cita);
  } catch (error) {
    console.error("Error al obtener cita:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.cancelCita = async (req, res) => {
  const citaId = req.params.id;

  try {
    const cita = await citasModel.getCitaById(citaId);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verifica que cita.fecha y cita.hora tengan valores válidos
    console.log("Fecha:", cita.fecha);
    console.log("Hora:", cita.hora);

    // Asegúrate de que el formato sea correcto
    const fechaHoraCita = moment(formatearFechaHora(cita.fecha, cita.hora));
    const ahora = moment();

    // Calcular la diferencia en minutos
    const diferenciaMinutos = fechaHoraCita.diff(ahora, "minutes");

    // Compara la fecha y la hora
    if (diferenciaMinutos <= 120) {
      return res.status(400).json({ message: "Imposible cancelar cita" });
    }

    // Si pasa la validación, elimina la cita
    await citasModel.deleteCitaById(citaId);
    res.json({ message: "Cita cancelada" });
  } catch (error) {
    console.error("Error al cancelar cita:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

function formatearFechaHora(fecha, hora) {
  const fechaFormateada = moment(fecha).format("YYYY-MM-DD");
  return `${fechaFormateada} ${hora}`;
}
