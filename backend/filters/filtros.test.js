const { filtroFechaHora, existeCitaEnHorario } = require('./filtros');
const db = require('../database');

jest.mock('../database'); // Mock de la base de datos para las pruebas

describe('filtroFechaHora', () => {
  test('debe retornar "valida" para una hora dentro del rango', () => {
    const resultado = filtroFechaHora("1", "2024-09-16", "10:00"); // Lunes
    expect(resultado).toBe('valida');
  });

  test('debe retornar "Cita fuera del horario disponible" para una hora fuera del rango', () => {
    const resultado = filtroFechaHora("1", "2024-09-16", "16:00"); // Lunes
    expect(resultado).toBe('Cita fuera del horario disponible');
  });

  test('debe retornar "Horario del médico no encontrado" para un médico no existente', () => {
    const resultado = filtroFechaHora("999", "2024-09-16", "10:00"); // Lunes
    expect(resultado).toBe('Horario del médico no encontrado');
  });

  test('debe retornar "Horario para el día seleccionado no encontrado" para un día no existente', () => {
    const resultado = filtroFechaHora("2", "2024-09-15", "10:00"); // Domingo
    expect(resultado).toBe('Horario para el día seleccionado no encontrado');
  });
});

describe('existeCitaEnHorario', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe retornar true si existe una cita en la base de datos', async () => {
    db.query.mockResolvedValueOnce([[{ id: 1, id_medico: "1", fecha: "2024-09-16", hora: "10:00" }]]);
    
    const resultado = await existeCitaEnHorario("1", "2024-09-16", "10:00");
    expect(resultado).toBe(true);
  });

  test('debe retornar false si no existe una cita en la base de datos', async () => {
    db.query.mockResolvedValueOnce([[]]);
    
    const resultado = await existeCitaEnHorario("1", "2024-09-16", "09:00");
    expect(resultado).toBe(false);
  });

  test('debe manejar errores en la consulta de la base de datos', async () => {
    const error = new Error("Error de base de datos");
    db.query.mockRejectedValueOnce(error);

    await expect(existeCitaEnHorario("1", "2024-09-16", "09:00")).rejects.toThrow("Error en la base de datos");
  });
});
