# 🔌 Endpoints del Backend - Documentación Completa

## Base URL
```
http://micalculadoraback
```

## 📋 Endpoints Implementados

### ✅ Calc (Operaciones)

#### 1. POST /api/calc - Guardar Operación
**Descripción:** Guarda una operación en el historial

**Método:** `POST`

**URL:** `http://micalculadoraback/api/calc`

**Body:**
```json
{
  "a": 5,
  "b": 3,
  "op": "add",
  "result": 8
}
```

**Parámetros:**
- `a` (number): Primer operando
- `b` (number): Segundo operando
- `op` (string): Operador - `"add"`, `"sub"`, `"mul"`, `"div"`
- `result` (number): Resultado de la operación

**Response:**
```json
{
  "_id": "...",
  "a": 5,
  "b": 3,
  "op": "add",
  "result": 8,
  "timestamp": "2025-01-11T..."
}
```

---

### ✅ Records (Historial)

#### 2. GET /api/records - Listar Historial
**Descripción:** Obtiene todas las operaciones guardadas

**Método:** `GET`

**URL:** `http://micalculadoraback/api/records`

**Query Params (opcional):**
- `op` (string): Filtrar por operador - `"add"`, `"sub"`, `"mul"`, `"div"`

**Ejemplo:**
```
GET http://micalculadoraback/api/records
GET http://micalculadoraback/api/records?op=add
```

**Response:**
```json
[
  {
    "_id": "...",
    "a": 5,
    "b": 3,
    "op": "add",
    "result": 8,
    "timestamp": "2025-01-11T..."
  },
  ...
]
```

#### 3. GET /api/records/:id - Obtener Operación Específica
**Descripción:** Obtiene una operación por su ID

**Método:** `GET`

**URL:** `http://micalculadoraback/api/records/:id`

**Ejemplo:**
```
GET http://micalculadoraback/api/records/507f1f77bcf86cd799439011
```

#### 4. DELETE /api/records/:id - Eliminar Operación
**Descripción:** Elimina una operación específica

**Método:** `DELETE`

**URL:** `http://micalculadoraback/api/records/:id`

**Ejemplo:**
```
DELETE http://micalculadoraback/api/records/507f1f77bcf86cd799439011
```

#### 5. DELETE /api/records - Eliminar Todo el Historial
**Descripción:** Elimina todas las operaciones guardadas

**Método:** `DELETE`

**URL:** `http://micalculadoraback/api/records`

---

## 🔄 Mapeo de Datos

### Frontend → Backend

| Frontend | Backend |
|----------|---------|
| `operand1` | `a` |
| `operand2` | `b` |
| `operator` | `op` |
| `result` | `result` |

### Backend → Frontend

El servicio API mapea automáticamente:
- `a` → `operand1`
- `b` → `operand2`
- `op` → `operator`
- `_id` → `id`

---

## ✅ Estado de Implementación

- ✅ **POST /api/calc** - Implementado
- ✅ **GET /api/records** - Implementado
- ✅ **GET /api/records?op=** - Implementado (filtro)
- ✅ **GET /api/records/:id** - No implementado (no necesario actualmente)
- ✅ **DELETE /api/records/:id** - Implementado
- ✅ **DELETE /api/records** - Implementado

---

## 📝 Notas

1. **Formato de Operadores:** El backend espera códigos de letras cortos (`add`, `sub`, `mul`, `div`), NO signos.

2. **Mapeo Automático:** El servicio API convierte automáticamente entre el formato del frontend y el formato del backend.

3. **Fallback:** Si el backend no está disponible, el sistema usa `localStorage` automáticamente.

4. **Limit:** El parámetro `limit` se aplica en el frontend después de recibir los datos, ya que el backend no lo soporta en query params.

---

**Última actualización:** 2025-01-11

