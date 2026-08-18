const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Datos en memoria (por ahora)
let nextId = 4;
const atractivos = [
  { id: 1, nombre: 'Catedral de Chillán', descripcion: 'Símbolo arquitectónico y punto de encuentro de la ciudad.', ubicacion: 'Centro' },
  { id: 2, nombre: 'Termas de Chillán', descripcion: 'Zona de montaña con termas, centro de ski y senderos.', ubicacion: 'Cordillera' },
  { id: 3, nombre: 'Valle Las Trancas', descripcion: 'Paisajes, bosques y rutas de trekking para todos los niveles.', ubicacion: 'Precordillera' },
];

// Rutas
app.get('/atractivos', (req, res) => {
  res.json(atractivos);
});

app.get('/atractivos/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = atractivos.find(a => a.id === id);
  if (!item) return res.status(404).json({ error: 'Atractivo no encontrado' });
  res.json(item);
});

// Helpers
function validarAtractivo({ nombre, descripcion }) {
  if (!nombre || nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!descripcion || descripcion.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres.';
  return '';
}

app.post('/atractivos', (req, res) => {
  const error = validarAtractivo(req.body);
  if (error) return res.status(400).json({ error });
  const { nombre, descripcion, ubicacion } = req.body;
  const nuevo = {
    id: nextId++,
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    ubicacion: (ubicacion || '').trim()
  };
  atractivos.push(nuevo);
  res.status(201).json(nuevo);
});

app.put('/atractivos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = atractivos.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Atractivo no encontrado' });
  const error = validarAtractivo(req.body);
  if (error) return res.status(400).json({ error });
  const { nombre, descripcion, ubicacion } = req.body;
  atractivos[idx] = {
    id,
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    ubicacion: (ubicacion || '').trim()
  };
  res.json(atractivos[idx]);
});

app.delete('/atractivos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = atractivos.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Atractivo no encontrado' });
  atractivos.splice(idx, 1);
  res.json({ mensaje: 'Atractivo eliminado correctamente' });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(3000, () => {
  console.log('API lista en http://localhost:3000');
});