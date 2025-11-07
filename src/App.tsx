import Calculator from './components/Calculator';
import './App.css';

/**
 * Componente principal de la aplicación
 * Renderiza la calculadora
 */
function App(): React.JSX.Element {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

