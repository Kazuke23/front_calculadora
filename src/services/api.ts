/**
 * Servicio API para comunicación con el backend
 * Preparado para integrar con MongoDB
 */

/**
 * Tipo para códigos de operadores (sin signos especiales)
 */
export type OperatorCode = 'add' | 'subtract' | 'multiply' | 'divide';

/**
 * Interfaz para los datos de una operación
 */
export interface OperationData {
  operand1: number;
  operand2: number;
  operator: OperatorCode; // Código: 'add', 'subtract', 'multiply', 'divide'
  result: number;
  operationString: string; // String visual para mostrar (ej: "5 + 3 = 8")
}

/**
 * Interfaz para una operación guardada (con ID y timestamp)
 */
export interface SavedOperation extends OperationData {
  id?: string;
  _id?: string;
  timestamp?: string;
}

/**
 * Interfaz para la respuesta del servidor
 */
interface ApiResponse {
  success?: boolean;
  [key: string]: unknown;
}

const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Guarda una operación en el historial (MongoDB)
 * @param {OperationData} operationData - Datos de la operación
 * @returns {Promise<SavedOperation>} Operación guardada
 */
export const saveOperation = async (operationData: OperationData): Promise<SavedOperation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operand1: operationData.operand1,
        operand2: operationData.operand2,
        operator: operationData.operator,
        result: operationData.result,
        operationString: operationData.operationString,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar la operación');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al guardar operación:', error);
    // Fallback: guardar en localStorage si el backend no está disponible
    const localHistory: SavedOperation[] = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const newEntry: SavedOperation = {
      id: Date.now().toString(),
      ...operationData,
      timestamp: new Date().toISOString(),
    };
    localHistory.unshift(newEntry);
    localStorage.setItem('calculatorHistory', JSON.stringify(localHistory.slice(0, 100))); // Máximo 100 entradas
    return newEntry;
  }
};

/**
 * Obtiene el historial de operaciones desde MongoDB
 * @param {number} limit - Número máximo de operaciones a obtener
 * @returns {Promise<SavedOperation[]>} Array de operaciones
 */
export const getHistory = async (limit: number = 50): Promise<SavedOperation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el historial');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener historial:', error);
    // Fallback: obtener de localStorage
    const localHistory: SavedOperation[] = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    return localHistory;
  }
};

/**
 * Elimina una operación específica del historial
 * @param {string} id - ID de la operación a eliminar
 * @returns {Promise<ApiResponse>} Respuesta del servidor
 */
export const deleteOperation = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la operación');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar operación:', error);
    // Fallback: eliminar de localStorage
    const localHistory: SavedOperation[] = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const filtered = localHistory.filter((item) => item.id !== id);
    localStorage.setItem('calculatorHistory', JSON.stringify(filtered));
    return { success: true };
  }
};

/**
 * Elimina todo el historial
 * @returns {Promise<ApiResponse>} Respuesta del servidor
 */
export const deleteAllHistory = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el historial');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar historial:', error);
    // Fallback: limpiar localStorage
    localStorage.removeItem('calculatorHistory');
    return { success: true };
  }
};

