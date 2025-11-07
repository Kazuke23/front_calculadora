# 🧮 Calculadora React con TypeScript

Calculadora web moderna desarrollada con React y TypeScript, que implementa las cuatro operaciones matemáticas básicas (suma, resta, multiplicación y división) con un diseño profesional y moderno.

## ✨ Características

- ✅ **Operaciones básicas**: Suma, resta, multiplicación y división
- ✅ **Entrada por teclado y botones**: Soporte completo para ambas formas de entrada
- ✅ **Historial de operaciones**: Guarda y consulta operaciones realizadas
- ✅ **Validación de errores**: Manejo robusto de errores (división por cero, valores inválidos, etc.)
- ✅ **Diseño moderno**: Card flotante con fondo dinámico animado
- ✅ **TypeScript**: Código completamente tipado para mayor seguridad
- ✅ **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🚀 Tecnologías

- **React 19.1.1** - Biblioteca de JavaScript para construir interfaces
- **TypeScript 5.9.3** - Superset de JavaScript con tipado estático
- **Vite 7.1.7** - Build tool y servidor de desarrollo
- **CSS3** - Estilos modernos con animaciones

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Git (para clonar el repositorio)

## 🛠️ Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Kazuke23/front_calculadora.git
   cd front_calculadora
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   - La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter ESLint

## 🎯 Requerimientos Funcionales Implementados

- **RF-01**: Operaciones básicas (suma, resta, multiplicación, división)
- **RF-02**: Entrada de datos mediante botones y teclado
- **RF-03**: Mostrar resultado al presionar '='
- **RF-04**: Borrar todo con botón 'C'
- **RF-05**: Borrar último dígito con botón '←'
- **RF-06**: Manejo de números decimales
- **RF-07**: Validación de errores
- **RF-08**: Guardar historial en MongoDB (con fallback a localStorage)
- **RF-09**: Consultar historial
- **RF-10**: Eliminar historial

## ⌨️ Atajos de Teclado

- **Números**: 0-9
- **Operadores**: +, -, *, /
- **Decimal**: . o ,
- **Igual**: = o Enter
- **Borrar**: Backspace o Delete
- **Limpiar**: Escape o C
- **Historial**: H

## 📁 Estructura del Proyecto

```
calculadora/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Calculator.tsx   # Componente principal
│   │   └── History.tsx     # Componente de historial
│   ├── services/            # Servicios API
│   │   └── api.ts          # Servicio para backend
│   ├── styles/             # Archivos CSS
│   │   ├── Calculator.css  # Estilos de la calculadora
│   │   └── History.css     # Estilos del historial
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── tsconfig.json           # Configuración TypeScript
└── vite.config.ts          # Configuración Vite
```

## 🔌 Integración con Backend

El proyecto está preparado para integrarse con un backend MongoDB. El servicio API (`src/services/api.ts`) incluye:

- Guardado de operaciones
- Consulta de historial
- Eliminación de operaciones
- Fallback automático a localStorage si el backend no está disponible

Para configurar la URL del backend, crea un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📚 Documentación

Para más detalles, consulta el archivo [DOCUMENTACION.md](./DOCUMENTACION.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo y profesional.

## 👨‍💻 Autor

Desarrollado como parte del frontend de una aplicación de calculadora con integración backend.

---

**Última actualización**: 2025
