# Capturas de pruebas de la API

Pruebas realizadas con **Thunder Client** (extensión de VS Code) sobre la API
`http://localhost:3000`.

| # | Archivo | Método | Endpoint | Código | Qué demuestra |
|---|---------|--------|----------|--------|----------------|
| 1 | `1-get-lista-200.png` | GET | `/atractivos` | 200 | Lista completa de atractivos |
| 2 | `2-post-crear-201.png` | POST | `/atractivos` | 201 | Creación de un recurso; el servidor asigna el `id` |
| 3 | `3-get-por-id-200.png` | GET | `/atractivos/4` | 200 | Lectura de un recurso individual |
| 4 | `4-put-actualizar-200.png` | PUT | `/atractivos/4` | 200 | Actualización de datos conservando el `id` |
| 5 | `5-post-invalido-400.png` | POST | `/atractivos` | 400 | **Validación**: rechaza nombre < 3 caracteres |
| 6 | `6-delete-inexistente-404.png` | DELETE | `/atractivos/4` | 404 | Manejo de error sobre un recurso inexistente |
| 7 | `7-delete-200.png` | DELETE | `/atractivos/4` | 200 | Eliminación exitosa |
| 8 | `8-frontend-conectado.png` | — | — | — | Frontend Vue consumiendo la API (listar y eliminar) |

## Validaciones implementadas

- `nombre`: mínimo 3 caracteres (se aplica `trim()` antes de contar)
- `descripcion`: mínimo 10 caracteres (se aplica `trim()` antes de contar)
- Recurso inexistente en GET/PUT/DELETE por id → `404`
- Ruta no definida → `404` con `{ "error": "Ruta no encontrada" }`

## Nota sobre persistencia

Los datos se almacenan **en memoria** (array en `server.js`), por lo que se
reinician al reiniciar el servidor. Esto es intencional en esta etapa del curso;
la persistencia con base de datos corresponde a unidades posteriores.
