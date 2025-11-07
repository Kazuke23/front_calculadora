# 📚 Documentación del Proyecto - Calculadora React

## 📋 Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes](#componentes)
4. [Funcionalidades](#funcionalidades)
5. [Estilos y Diseño](#estilos-y-diseño)
6. [Integración con Backend](#integración-con-backend)
7. [Instalación y Uso](#instalación-y-uso)
8. [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 📖 Descripción del Proyecto

Calculadora web moderna desarrollada con React, que implementa las cuatro operaciones matemáticas básicas (suma, resta, multiplicación y división). El proyecto cuenta con un diseño profesional y moderno, caracterizado por:

- **Card flotante**: Interfaz de calculadora en una tarjeta con bordes redondeados
- **Fondo dinámico**: Formas geométricas abstractas con colores vibrantes
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **UX profesional**: Animaciones suaves y feedback visual en las interacciones

---

## 📁 Estructura del Proyecto

```
calculadora/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Calculator.jsx   # Componente principal de la calculadora
│   │   └── History.jsx      # Componente de historial de operaciones
│   ├── services/            # Servicios API
│   │   └── api.js           # Servicio para comunicación con backend
│   ├── styles/              # Archivos CSS
│   │   ├── Calculator.css   # Estilos de la calculadora
│   │   └── History.css      # Estilos del historial
│   ├── App.jsx              # Componente principal de la app
│   ├── App.css              # Estilos del componente App
│   ├── main.jsx             # Punto de entrada de la aplicación
│   └── index.css            # Estilos globales
├── public/                  # Archivos estáticos
├── package.json             # Dependencias del proyecto
├── vite.config.js           # Configuración de Vite
├── start-dev.bat            # Script para iniciar en Windows
└── DOCUMENTACION.md         # Este archivo
```

---

## 🧩 Componentes

### Calculator.jsx

Componente principal que contiene toda la lógica de la calculadora.

#### Estados del Componente

- `display` (string): Número actual mostrado en pantalla
- `operation` (string): Cadena de la operación completa (historial)
- `operator` (string | null): Operador seleccionado (+, -, ×, ÷)
- `previousValue` (number | null): Primer número de la operación
- `shouldResetDisplay` (boolean): Controla si se debe limpiar la pantalla

#### Funciones Principales

##### `handleNumber(num: string)`
Maneja la entrada de números del 0-9.
- Si `shouldResetDisplay` es true, reemplaza el display
- Si no, concatena el número al display actual

##### `handleDecimal()`
Agrega el punto decimal al número actual.
- Previene múltiples puntos decimales
- Resetea el display si es necesario

##### `handleOperator(op: string)`
Maneja la selección de operadores (+, -, ×, ÷).
- Calcula el resultado si hay una operación pendiente
- Guarda el operador seleccionado
- Actualiza la cadena de operación mostrada

##### `calculate(): number`
Realiza el cálculo matemático basado en el operador.
- Retorna el resultado de la operación
- Maneja la división por cero con alerta

##### `handleEquals()`
Ejecuta el cálculo y muestra el resultado.
- Calcula el resultado final
- Actualiza el display con el resultado
- Limpia los estados de operación

##### `handleClear()`
Limpia toda la calculadora (botón C).
- Resetea todos los estados a sus valores iniciales

##### `handleBackspace()`
Borra el último dígito ingresado (botón ←).

##### `handleToggleSign()`
Cambia el signo del número actual (botón +/-).

##### `handlePercentage()`
Convierte el número actual a porcentaje (botón %).

##### `formatNumber(num: number): string`
Formatea números con separadores de miles (comas).
- Ejemplo: 1234.56 → "1,234.56"

---

## ⚙️ Funcionalidades

### ✅ Requerimientos Funcionales Implementados

#### RF-01: Operaciones básicas ✅
- **Suma (+)**: Suma dos números
  - Ejemplo: 5 + 3 = 8
- **Resta (-)**: Resta el segundo número del primero
  - Ejemplo: 10 - 4 = 6
- **Multiplicación (×)**: Multiplica dos números
  - Ejemplo: 6 × 7 = 42
- **División (÷)**: Divide el primer número por el segundo
  - Ejemplo: 20 ÷ 4 = 5
  - Protección contra división por cero

#### RF-02: Entrada de datos ✅
- **Botones**: Todos los números y operadores disponibles mediante botones
- **Teclado**: Soporte completo para entrada por teclado:
  - Números: 0-9
  - Operadores: +, -, *, / (×, ÷)
  - Decimal: . o ,
  - Igual: = o Enter
  - Borrar: Backspace o Delete
  - Limpiar: Escape o C
  - Historial: H

#### RF-03: Mostrar resultado ✅
- El resultado se muestra automáticamente al presionar '=' o Enter
- Formato con separadores de miles
- Muestra la operación completa en la parte superior

#### RF-04: Borrar todo ✅
- Botón 'C' limpia toda la calculadora
- También funciona con tecla Escape o C del teclado

#### RF-05: Borrar último dígito ✅
- Botón '←' elimina el último carácter ingresado
- También funciona con Backspace o Delete

#### RF-06: Manejo de decimales ✅
- Permite ingresar números decimales con el botón ','
- Soporte completo para operaciones con decimales
- También funciona con . o , del teclado

#### RF-07: Validación de errores ✅
- **División por cero**: Muestra error "No se puede dividir por cero"
- **Valores inválidos**: Detecta NaN y valores no numéricos
- **Resultado infinito**: Valida resultados no finitos
- **Números muy largos**: Limita a 15 dígitos
- **Mensajes claros**: Todos los errores se muestran en la pantalla

#### RF-08: Guardar historial ✅
- Cada operación se guarda automáticamente al presionar '='
- Se conecta con el backend MongoDB (con fallback a localStorage)
- Guarda: operandos, operador, resultado y timestamp

#### RF-09: Consultar historial ✅
- Botón de historial (📋) en la esquina superior derecha
- Panel modal con lista de todas las operaciones
- Muestra operación completa y fecha/hora
- También se abre con tecla H

#### RF-10: Eliminar historial ✅
- Botón para eliminar operaciones individuales
- Botón "Eliminar Todo" para limpiar todo el historial
- Confirmación antes de eliminar todo

### Funciones Adicionales

✅ **Porcentaje (%)**: Convierte el número a porcentaje
- Ejemplo: 50 → 0.5

✅ **Cambiar Signo (+/-)**: Invierte el signo del número
- Ejemplo: 5 → -5

✅ **Retroceso (←)**: Borra el último dígito ingresado

✅ **Limpiar (C)**: Resetea toda la calculadora

✅ **Punto Decimal (,)**: Permite ingresar números decimales

### Características de UX

- **Formato de números**: Separadores de miles automáticos
- **Historial de operación**: Muestra la operación completa en la parte superior
- **Feedback visual**: Animaciones en botones al hacer clic
- **Prevención de errores**: Validación de división por cero

---

## 🎨 Estilos y Diseño

### Paleta de Colores

- **Pantalla y Operadores**: Azul oscuro (#2d3748, #4a5568)
- **Botones Numéricos**: Blanco (#ffffff)
- **Botón Igual**: Naranja/Coral (#ff6b6b, #ee5a6f)
- **Fondo**: Gradiente púrpura con formas geométricas

### Fondo Dinámico

El fondo está compuesto por 4 formas geométricas superpuestas:

1. **Shape 1**: Naranja/Coral (superior izquierda)
2. **Shape 2**: Azul oscuro (inferior derecha)
3. **Shape 3**: Azul medio (inferior izquierda)
4. **Shape 4**: Azul claro (superior derecha)

Cada forma usa `clip-path` para crear polígonos únicos y `transform: rotate()` para orientación dinámica.

### Diseño Responsive

- **Desktop**: Botones de 70px, fuente de 48px en resultado
- **Mobile**: Botones de 60px, fuente de 36px en resultado
- **Breakpoint**: 480px

### Animaciones

- **Fade In**: La card aparece con animación suave
- **Button Press**: Los botones se reducen ligeramente al hacer clic
- **Hover Effects**: Sombras y cambios de color en hover
- **Fondo Dinámico**: Las formas geométricas se mueven continuamente con animaciones flotantes
  - Cada forma tiene su propia animación con duraciones diferentes (18s-25s)
  - Incluye rotación, traslación y escalado para efecto de profundidad

---

## 🔌 Integración con Backend

### Preparación para Backend

El componente `Calculator` está estructurado para facilitar la integración con un backend. Las funciones clave que pueden ser modificadas son:

#### Puntos de Integración Sugeridos

1. **Envío de Operaciones**:
   ```javascript
   // En handleEquals(), después de calcular:
   const sendToBackend = async (operation, result) => {
     await fetch('/api/calculations', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ operation, result })
     });
   };
   ```

2. **Historial desde Backend**:
   ```javascript
   // Agregar estado para historial
   const [history, setHistory] = useState([]);
   
   // Función para cargar historial
   useEffect(() => {
     fetch('/api/calculations')
       .then(res => res.json())
       .then(data => setHistory(data));
   }, []);
   ```

3. **Validación en Backend**:
   - Mover la lógica de cálculo al backend
   - Enviar operación como string: "5 + 3"
   - Recibir resultado desde el servidor

#### Estructura de Datos Sugerida

```javascript
// Objeto de operación para enviar al backend
{
  operand1: number,
  operand2: number,
  operator: string, // '+', '-', '×', '÷'
  result: number,
  timestamp: string
}
```

#### Modificaciones Necesarias

1. **Crear servicio API** (`src/services/api.js`):
   ```javascript
   export const calculateOperation = async (operand1, operand2, operator) => {
     const response = await fetch('/api/calculate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ operand1, operand2, operator })
     });
     return response.json();
   };
   ```

2. **Modificar `handleEquals()`**:
   ```javascript
   const handleEquals = async () => {
     if (operator && previousValue !== null) {
       const result = await calculateOperation(
         previousValue,
         parseFloat(display),
         operator
       );
       setDisplay(String(result));
       // ... resto del código
     }
   };
   ```

---

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)

### Instalación

1. **Clonar o navegar al proyecto**:
   ```bash
   cd calculadora
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   
   O usar el script alternativo (para evitar problemas de PowerShell):
   ```bash
   .\start-dev.bat
   ```

4. **Abrir en el navegador**:
   - La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Crea la versión de producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter ESLint

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19.1.1**: Biblioteca de JavaScript para construir interfaces
- **Vite 7.1.7**: Build tool y servidor de desarrollo
- **CSS3**: Estilos modernos con:
  - Flexbox y Grid
  - Clip-path para formas geométricas
  - Gradientes y sombras
  - Animaciones y transiciones

### Herramientas de Desarrollo

- **ESLint**: Linter para mantener código limpio
- **@vitejs/plugin-react**: Plugin de Vite para React

### Estructura de Código

- **ES6+**: Sintaxis moderna de JavaScript
- **JSX**: Sintaxis de React para componentes
- **CSS Modules**: Estilos organizados por componente

---

## 📝 Notas de Desarrollo

### Decisiones de Diseño

1. **Separación de Componentes**: La calculadora está en su propio componente para facilitar mantenimiento y reutilización.

2. **Estilos Modulares**: CSS separado por componente para mejor organización.

3. **Formato de Números**: Implementación de separadores de miles para mejor legibilidad.

4. **Manejo de Estados**: Uso de múltiples estados para control preciso del flujo de la calculadora.

5. **Prevención de Errores**: Validación de división por cero y manejo de casos edge.

### Mejoras Futuras

- [ ] Historial de operaciones
- [ ] Soporte para paréntesis
- [ ] Operaciones avanzadas (potencia, raíz cuadrada)
- [ ] Modo oscuro/claro
- [ ] Sonidos de feedback
- [ ] Soporte para teclado
- [ ] Persistencia de historial en localStorage

---

## 👨‍💻 Autor

Proyecto desarrollado como parte del frontend de una aplicación de calculadora con integración backend.

---

## 📄 Licencia

Este proyecto es de uso educativo y profesional.

---

**Última actualización**: 2025

