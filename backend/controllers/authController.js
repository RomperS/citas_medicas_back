const usuarioModel = require('../models/usuario');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const user = await usuarioModel.buscarUsuarioPorNombre(usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (contrasena !== user.contrasena) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const rol = user.rol === 1 ? 'admin' : 'user';
    res.status(200).json({ 
      message: 'Login exitoso', 
      rol, 
      pacienteAsignado: user.pacienteAsignado 
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
