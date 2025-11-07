import { useState, useEffect } from 'react';
import { getHistory, deleteOperation, deleteAllHistory } from '../services/api';
import '../styles/History.css';

/**
 * Interfaz para las props del componente History
 */
interface HistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Interfaz para un elemento del historial
 */
interface HistoryItem {
  id?: string;
  _id?: string;
  operand1: number;
  operand2: number;
  operator: string; // Puede ser código ('add', 'subtract', etc.) o signo (por compatibilidad)
  result: number;
  operationString?: string; // String visual para mostrar
  timestamp?: string;
}

/**
 * Componente History
 * 
 * Muestra el historial de operaciones realizadas (RF-09)
 * Permite eliminar operaciones individuales o todo el historial (RF-10)
 * 
 * @component
 * @param {HistoryProps} props - Props del componente
 * @returns {React.JSX.Element | null} Componente de historial
 */
function History({ isOpen, onClose }: HistoryProps): React.JSX.Element | null {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga el historial desde el backend o localStorage
   */
  const loadHistory = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory(50);
      setHistory(data);
    } catch (err) {
      setError('Error al cargar el historial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina una operación específica (RF-10)
   * @param {string} id - ID de la operación a eliminar
   */
  const handleDeleteOperation = async (id: string): Promise<void> => {
    try {
      await deleteOperation(id);
      setHistory(history.filter((item) => (item.id || item._id) !== id));
    } catch (err) {
      setError('Error al eliminar la operación');
      console.error(err);
    }
  };

  /**
   * Elimina todo el historial (RF-10)
   */
  const handleDeleteAll = async (): Promise<void> => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todo el historial?')) {
      try {
        await deleteAllHistory();
        setHistory([]);
      } catch (err) {
        setError('Error al eliminar el historial');
        console.error(err);
      }
    }
  };

  /**
   * Formatea la fecha para mostrar
   * @param {string} timestamp - Timestamp ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (timestamp: string): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Cargar historial cuando se abre
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-panel" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h2>Historial de Operaciones</h2>
          <button className="history-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="history-actions">
          <button className="btn-delete-all" onClick={handleDeleteAll}>
            Eliminar Todo
          </button>
          <button className="btn-refresh" onClick={loadHistory}>
            Actualizar
          </button>
        </div>

        {loading && (
          <div className="history-loading">Cargando...</div>
        )}

        {error && (
          <div className="history-error">{error}</div>
        )}

        <div className="history-content">
          {history.length === 0 ? (
            <div className="history-empty">
              <p>No hay operaciones en el historial</p>
              <p className="history-empty-subtitle">
                Las operaciones se guardarán automáticamente cuando presiones "="
              </p>
            </div>
          ) : (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id || item._id} className="history-item">
                  <div className="history-item-content">
                    <div className="history-operation">
                      {item.operationString || 
                       `${item.operand1} ${item.operator} ${item.operand2} = ${item.result}`}
                    </div>
                    {item.timestamp && (
                      <div className="history-timestamp">
                        {formatDate(item.timestamp)}
                      </div>
                    )}
                  </div>
                  <button
                    className="history-delete-btn"
                    onClick={() => handleDeleteOperation(item.id || item._id || '')}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;

