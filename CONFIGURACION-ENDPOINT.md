# 🔌 Configuración del Endpoint del Backend

## Endpoint Configurado

El endpoint del backend está configurado como:

```
http://micalculadoraback/api
```

## 📍 Endpoints Disponibles

### 1. Guardar Operación
```
POST http://micalculadoraback/api/calc
```

**Body:**
```json
{
  "a": 5,
  "b": 3,
  "op": "add",
  "result": 8
}
```

**Nota:** El backend usa `a`, `b`, `op` en lugar de `operand1`, `operand2`, `operator`

### 2. Obtener Historial
```
GET http://micalculadoraback/api/records
GET http://micalculadoraback/api/records?op=add  (filtro por operador)
```

### 3. Obtener Operación Específica
```
GET http://micalculadoraback/api/records/:id
```

### 4. Eliminar Operación
```
DELETE http://micalculadoraback/api/records/:id
```

### 5. Eliminar Todo el Historial
```
DELETE http://micalculadoraback/api/records
```

## ⚙️ Configuración mediante Variable de Entorno

Si necesitas cambiar el endpoint, crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://micalculadoraback/api
```

O para otro dominio:

```env
VITE_API_URL=https://micalculadoraback.com/api
```

## 🔄 Fallback a localStorage

Si el backend no está disponible, el sistema automáticamente:
- Guarda las operaciones en `localStorage`
- Recupera el historial desde `localStorage`
- Funciona sin conexión al backend

## 📝 Formato de Datos

### Operador (operator)
Los operadores se envían como códigos de letras:
- `"add"` - Suma
- `"subtract"` - Resta
- `"multiply"` - Multiplicación
- `"divide"` - División

**NO se usan signos** (`+`, `-`, `×`, `÷`) para evitar problemas en URLs y bases de datos.

### Ejemplo de Operación Guardada

```json
{
  "operand1": 5,
  "operand2": 3,
  "operator": "add",
  "result": 8,
  "operationString": "5 add 3 = 8",
  "timestamp": "2025-01-11T12:00:00.000Z"
}
```

## 🔍 Verificación

Para verificar que el endpoint está funcionando:

1. Abre la consola del navegador (F12)
2. Realiza una operación en la calculadora
3. Presiona "="
4. Revisa la pestaña "Network" para ver la petición a `micalculadoraback/api/calculations`

## 🛠️ Troubleshooting

### Error: "Failed to fetch"
- Verifica que el backend esté corriendo
- Verifica que la URL sea correcta
- Revisa CORS en el backend

### Error: "Network Error"
- Verifica la conectividad de red
- El sistema usará localStorage como fallback automáticamente

---

**Endpoint actual**: `http://micalculadoraback/api`

