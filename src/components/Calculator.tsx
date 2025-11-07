import { useState, useEffect, useCallback } from 'react';
import '../styles/Calculator.css';
import { saveOperation } from '../services/api';
import History from './History';

/**
 * Tipo para los códigos de operadores (sin signos especiales)
 * Estrategia: Usar letras para evitar problemas en URLs, APIs y bases de datos
 * Códigos del backend: add, sub, mul, div
 */
type OperatorCode = 'add' | 'sub' | 'mul' | 'div' | null;

/**
 * Tipo para signos visuales en la UI
 */
type OperatorSign = '+' | '-' | '×' | '÷';

/**
 * Convierte un signo visual a código interno (formato del backend)
 * @param sign - Signo visual del operador
 * @returns Código del operador (add, sub, mul, div)
 */
const signToCode = (sign: OperatorSign): OperatorCode => {
  switch(sign) {
    case '+': return 'add';
    case '-': return 'sub';
    case '×': return 'mul';
    case '÷': return 'div';
  }
};

/**
 * Convierte un código interno a signo visual (para botones)
 * @param code - Código del operador
 * @returns Signo visual del operador
 */
const codeToSign = (code: OperatorCode): string => {
  switch(code) {
    case 'add': return '+';
    case 'sub': return '-';
    case 'mul': return '×';
    case 'div': return '÷';
    default: return '';
  }
};

/**
 * Convierte un código interno a texto para mostrar en operaciones
 * @param code - Código del operador
 * @returns Texto del operador (letras)
 */
const codeToText = (code: OperatorCode): string => {
  switch(code) {
    case 'add': return 'add';
    case 'sub': return 'sub';
    case 'mul': return 'mul';
    case 'div': return 'div';
    default: return '';
  }
};

/**
 * Componente Calculator
 * 
 * Calculadora funcional con operaciones básicas (suma, resta, multiplicación, división)
 * Diseño moderno con card flotante y fondo dinámico
 * 
 * @component
 * @returns {React.JSX.Element} Componente de calculadora
 */
function Calculator(): React.JSX.Element {
  // Estado para el número actual mostrado en pantalla
  const [display, setDisplay] = useState<string>('0');
  
  // Estado para la operación completa (historial)
  const [operation, setOperation] = useState<string>('');
  
  // Estado para el operador seleccionado (código interno: add, subtract, multiply, divide)
  const [operator, setOperator] = useState<OperatorCode>(null);
  
  // Estado para el valor previo (primer número de la operación)
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  
  // Estado para controlar si se debe limpiar la pantalla en la próxima entrada
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  
  // Estado para mensajes de error
  const [error, setError] = useState<string | null>(null);
  
  // Estado para controlar el historial
  const [showHistory, setShowHistory] = useState<boolean>(false);

  /**
   * Formatea números para mostrar con separadores de miles
   * @param {number} num - Número a formatear
   * @returns {string} Número formateado
   */
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return '0';
    
    // Convierte a string y formatea con comas como separadores de miles
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  /**
   * Maneja la entrada de números
   * @param {string} num - Número a agregar
   */
  const handleNumber = (num: string): void => {
    // Limpiar error si existe
    if (error) {
      setError(null);
    }
    
    if (shouldResetDisplay) {
      // Si se debe resetear, mostrar solo el nuevo número
      setDisplay(num);
      setShouldResetDisplay(false);
      // Actualizar la operación: "valor operador nuevo_numero" (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        setOperation(`${formattedValue} ${codeToText(operator)} ${num}`);
      }
    } else {
      // Validar longitud máxima
      if (display.length >= 15) {
        setError('Error: Número demasiado largo');
        return;
      }
      const newDisplay = display === '0' ? num : display + num;
      setDisplay(newDisplay);
      
      // Actualizar la operación en tiempo real si hay un operador (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        const currentFormatted = formatNumber(parseFloat(newDisplay));
        setOperation(`${formattedValue} ${codeToText(operator)} ${currentFormatted}`);
      }
    }
  };

  /**
   * Maneja el punto decimal
   */
  const handleDecimal = (): void => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      // Actualizar operación cuando se empieza con decimal (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        setOperation(`${formattedValue} ${codeToText(operator)} 0.`);
      }
    } else if (!display.includes('.')) {
      const newDisplay = display + '.';
      setDisplay(newDisplay);
      
      // Actualizar la operación en tiempo real si hay un operador (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        const currentFormatted = formatNumber(parseFloat(newDisplay));
        setOperation(`${formattedValue} ${codeToText(operator)} ${currentFormatted}`);
      }
    }
  };

  /**
   * Realiza el cálculo basado en el operador
   * @returns {number|null} Resultado del cálculo o null si hay error
   */
  const calculate = (): number | null => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null || operator === null) {
      return currentValue;
    }

    // Validación de valores inválidos
    if (isNaN(previousValue) || isNaN(currentValue)) {
      setError('Error: Valores inválidos');
      return null;
    }

    let result: number;
    try {
      switch (operator) {
        case 'add':
          result = previousValue + currentValue;
          break;
        case 'sub':
          result = previousValue - currentValue;
          break;
        case 'mul':
          result = previousValue * currentValue;
          break;
        case 'div':
          if (currentValue === 0) {
            setError('Error: No se puede dividir por cero');
            return null;
          }
          result = previousValue / currentValue;
          break;
        default:
          return currentValue;
      }

      // Validación de resultado infinito o NaN
      if (!isFinite(result)) {
        setError('Error: Resultado inválido');
        return null;
      }

      setError(null);
      return result;
    } catch (err) {
      setError('Error: Operación inválida');
      return null;
    }
  };

  /**
   * Maneja los operadores (convierte signo visual a código interno)
   * @param {OperatorSign} sign - Signo visual del operador (+, -, ×, ÷)
   */
  const handleOperator = (sign: OperatorSign): void => {
    const op = signToCode(sign);
    if (op === null) return;
    
    const currentValue = parseFloat(display);

    // Si ya hay un operador previo, calcular primero
    if (operator && previousValue !== null && !shouldResetDisplay) {
      const result = calculate();
      if (result !== null) {
        setDisplay(String(result));
        setPreviousValue(result);
        // Actualizar la operación con el resultado (mostrar letras)
        setOperation(`${formatNumber(result)} ${codeToText(op)}`);
      } else {
        // Si hay error, no cambiar el operador
        return;
      }
    } else {
      // Primera vez o no hay operador previo, o ya se reseteó
      // Usar el valor actual del display
      const valueToUse = shouldResetDisplay ? previousValue : currentValue;
      if (valueToUse !== null && !isNaN(valueToUse)) {
        setPreviousValue(valueToUse);
        // Mostrar la operación: "valor add" (usar letras)
        const formattedValue = formatNumber(valueToUse);
        setOperation(`${formattedValue} ${codeToText(op)}`);
      }
    }

    setOperator(op); // Guardar código interno
    setShouldResetDisplay(true);
  };

  /**
   * Maneja el botón de igual (=)
   */
  const handleEquals = async (): Promise<void> => {
    if (operator && previousValue !== null) {
      const currentValue = parseFloat(display);
      
      // Limpiar error previo
      setError(null);
      
      const result = calculate();
      
      // Si hay error, calculate retorna null
      if (result === null) {
        return;
      }
      
      // Si no hay error, proceder
      const formattedResult = formatNumber(result);
      // operationString usa letras para mostrar (no signos)
      const operationString = `${formatNumber(previousValue)} ${codeToText(operator)} ${formatNumber(currentValue)} = ${formattedResult}`;
      
      setDisplay(String(result));
      setOperation(operationString);
      setPreviousValue(null);
      setOperator(null);
      setShouldResetDisplay(true);

      // Guardar en historial (RF-08) - Usar código interno, no signo
      try {
        await saveOperation({
          operand1: previousValue,
          operand2: currentValue,
          operator: operator!, // Código: 'add', 'subtract', 'multiply', 'divide'
          result: result,
          operationString: operationString, // String visual para mostrar
        });
      } catch (err) {
        console.error('Error al guardar en historial:', err);
      }
    }
  };

  /**
   * Limpia toda la calculadora (botón C)
   */
  const handleClear = (): void => {
    setDisplay('0');
    setOperation('');
    setOperator(null);
    setPreviousValue(null);
    setShouldResetDisplay(false);
    setError(null);
  };

  /**
   * Borra el último dígito (botón ←)
   */
  const handleBackspace = (): void => {
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      // Actualizar operación en tiempo real si hay un operador
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        const currentFormatted = formatNumber(parseFloat(newDisplay));
        setOperation(`${formattedValue} ${codeToSign(operator)} ${currentFormatted}`);
      }
    } else {
      setDisplay('0');
      // Actualizar operación si hay un operador
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        setOperation(`${formattedValue} ${operator} 0`);
      }
    }
  };

  /**
   * Cambia el signo del número (botón +/-)
   */
  const handleToggleSign = (): void => {
    setDisplay(String(parseFloat(display) * -1));
  };

  /**
   * Calcula el porcentaje (botón %)
   */
  const handlePercentage = (): void => {
    setDisplay(String(parseFloat(display) / 100));
  };

  // Funciones memoizadas para el teclado
  const handleNumberMemo = useCallback((num: string): void => {
    setError(null);
    setDisplay(prev => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false);
        // Actualizar operación cuando se empieza un nuevo número (usar letras)
        if (operator && previousValue !== null) {
          const formattedValue = formatNumber(previousValue);
          setOperation(`${formattedValue} ${codeToText(operator)} ${num}`);
        }
        return num;
      }
      if (prev.length >= 15) {
        setError('Error: Número demasiado largo');
        return prev;
      }
      const newDisplay = prev === '0' ? num : prev + num;
      // Actualizar operación en tiempo real (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        const currentFormatted = formatNumber(parseFloat(newDisplay));
        setOperation(`${formattedValue} ${codeToText(operator)} ${currentFormatted}`);
      }
      return newDisplay;
    });
  }, [shouldResetDisplay, operator, previousValue]);

  const handleDecimalMemo = useCallback((): void => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      // Actualizar operación cuando se empieza con decimal (usar letras)
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        setOperation(`${formattedValue} ${codeToText(operator)} 0.`);
      }
    } else {
      setDisplay(prev => {
        if (prev.includes('.')) return prev;
        const newDisplay = prev + '.';
        // Actualizar operación en tiempo real
        if (operator && previousValue !== null) {
          const formattedValue = formatNumber(previousValue);
          const currentFormatted = formatNumber(parseFloat(newDisplay));
          setOperation(`${formattedValue} ${operator} ${currentFormatted}`);
        }
        return newDisplay;
      });
    }
  }, [shouldResetDisplay, operator, previousValue]);

  const handleBackspaceMemo = useCallback((): void => {
    setDisplay(prev => {
      const newDisplay = prev.length > 1 ? prev.slice(0, -1) : '0';
      // Actualizar operación en tiempo real si hay un operador
      if (operator && previousValue !== null) {
        const formattedValue = formatNumber(previousValue);
        const currentFormatted = formatNumber(parseFloat(newDisplay));
        setOperation(`${formattedValue} ${codeToSign(operator)} ${currentFormatted}`);
      }
      return newDisplay;
    });
  }, [operator, previousValue]);

  /**
   * Maneja eventos del teclado (RF-02)
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      // Prevenir comportamiento por defecto solo para teclas relevantes
      if (/[0-9+\-*/.=,Enter]/.test(e.key) || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Escape') {
        e.preventDefault();
      }

      // Números 0-9
      if (/[0-9]/.test(e.key)) {
        handleNumberMemo(e.key);
      }
      // Operadores (convertir a signos visuales)
      else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('×');
      } else if (e.key === '/') {
        handleOperator('÷');
      }
      // Decimal
      else if (e.key === '.' || e.key === ',') {
        handleDecimalMemo();
      }
      // Igual
      else if (e.key === '=' || e.key === 'Enter') {
        handleEquals();
      }
      // Borrar último dígito
      else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleBackspaceMemo();
      }
      // Limpiar todo
      else if (e.key === 'Escape') {
        handleClear();
      }
      // Historial (tecla H)
      else if (e.key === 'h' || e.key === 'H') {
        setShowHistory(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNumberMemo, handleDecimalMemo, handleBackspaceMemo]);

  // Formatea el display para mostrar con comas
  const displayFormatted = formatNumber(parseFloat(display));

  return (
    <div className="calculator-container">
      {/* Fondo dinámico con formas geométricas */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Card de la calculadora */}
      <div className="calculator-card">
        {/* Botón de historial */}
        <button 
          className="history-toggle-btn" 
          onClick={() => setShowHistory(true)}
          title="Ver historial (H)"
        >
          📋
        </button>
        
        {/* Pantalla de la calculadora */}
        <div className="calculator-screen">
          <div className="operation-display">
            {operation || '\u00A0'}
          </div>
          {error && (
            <div className="error-display">
              {error}
            </div>
          )}
          <div className="result-display">
            {displayFormatted}
          </div>
        </div>

        {/* Teclado de botones */}
        <div className="calculator-buttons">
          {/* Fila 1: Funciones especiales */}
          <button className="btn btn-function" onClick={handlePercentage}>%</button>
          <button className="btn btn-function" onClick={handleClear}>C</button>
          <button className="btn btn-function" onClick={handleBackspace}>
            <span className="backspace-icon">←</span>
          </button>
          <button className="btn btn-operator" onClick={() => handleOperator('÷')}>÷</button>

          {/* Fila 2: Números y operadores */}
          <button className="btn btn-number" onClick={() => handleNumber('7')}>7</button>
          <button className="btn btn-number" onClick={() => handleNumber('8')}>8</button>
          <button className="btn btn-number" onClick={() => handleNumber('9')}>9</button>
          <button className="btn btn-operator" onClick={() => handleOperator('×')}>×</button>

          {/* Fila 3: Números y operadores */}
          <button className="btn btn-number" onClick={() => handleNumber('4')}>4</button>
          <button className="btn btn-number" onClick={() => handleNumber('5')}>5</button>
          <button className="btn btn-number" onClick={() => handleNumber('6')}>6</button>
          <button className="btn btn-operator" onClick={() => handleOperator('-')}>-</button>

          {/* Fila 4: Números y operadores */}
          <button className="btn btn-number" onClick={() => handleNumber('1')}>1</button>
          <button className="btn btn-number" onClick={() => handleNumber('2')}>2</button>
          <button className="btn btn-number" onClick={() => handleNumber('3')}>3</button>
          <button className="btn btn-operator" onClick={() => handleOperator('+')}>+</button>

          {/* Fila 5: Números y funciones */}
          <button className="btn btn-number btn-zero" onClick={() => handleNumber('0')}>0</button>
          <button className="btn btn-number" onClick={handleDecimal}>,</button>
          <button className="btn btn-function" onClick={handleToggleSign}>+/-</button>
          <button className="btn btn-operator btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>

      {/* Componente de historial */}
      <History isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}

export default Calculator;

