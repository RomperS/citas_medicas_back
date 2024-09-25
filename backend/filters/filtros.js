const fs = require("fs");
const path = require("path");
const db = require('../database');

const horariosPath = path.join(__dirname, "../data/horarios.json");
const horariosData = JSON.parse(fs.readFileSync(horariosPath));

const logFilePath = path.join(__dirname, "log.txt");

function logData(data) {
  const logMessage = `[${new Date().toISOString()}] ${data}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

function obtenerDiaDeLaSemana(fecha) {
  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const fechaObj = new Date(`${fecha}T00:00:00`);
  return dias[fechaObj.getUTCDay()];
}

function filtroFechaHora(id_medico, fecha, hora) {
  const dia = obtenerDiaDeLaSemana(fecha);
  logData(
    `ID Médico: ${id_medico}, Fecha: ${fecha}, Hora: ${hora}, Día: ${dia}`
  );

  const horariosMedico = horariosData[id_medico];

  if (!horariosMedico) {
    logData("Horario del médico no encontrado");
    return "Horario del médico no encontrado";
  }

  const horarioDia = horariosMedico.find((h) => h.dia.toLowerCase() === dia);
  logData(`Horarios para el día ${dia}: ${JSON.stringify(horarioDia)}`);

  if (!horarioDia) {
    logData("Horario para el día seleccionado no encontrado");
    return "Horario para el día seleccionado no encontrado";
  }

  const citaHora = hora;
  let citaValida = false;

  horarioDia.horarios.forEach((rango) => {
    const [inicio, fin] = rango.split("-");
    logData(`Comparando cita: ${citaHora} con horario: ${inicio}-${fin}`);

    if (citaHora >= inicio && citaHora <= fin) {
      citaValida = true;
    }
  });

  logData(`Cita válida: ${citaValida}`);

  if (citaValida) {
    return "valida";
  } else {
    return "Cita fuera del horario disponible";
  }
}

const existeCitaEnHorario = async (id_medico, fecha, hora) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM citas WHERE id_medico = ? AND fecha = ? AND hora = ?',
        [id_medico, fecha, hora]
      );
      logData([id_medico, fecha, hora])
      return rows.length > 0;
    } catch (error) {
      logData(`Error consultando citas: ${error.message}`);
      throw new Error("Error en la base de datos");
    }
  };
  

module.exports = { filtroFechaHora, existeCitaEnHorario };
