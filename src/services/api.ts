/**
 * Servicio API para comunicación con el backend
 * Preparado para integrar con MongoDB
 */

/**
 * Tipo para códigos de operadores (sin signos especiales)
 * Códigos del backend: add, sub, mul, div
 */
export type OperatorCode = 'add' | 'sub' | 'mul' | 'div';

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

// Endpoint del backend - puede ser configurado mediante variable de entorno
// Base URL sin /api porque los endpoints ya lo incluyen
const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'https://micalculadoraback.vercel.app';

/**
 * Guarda una operación en el historial (MongoDB)
 * @param {OperationData} operationData - Datos de la operación
 * @returns {Promise<SavedOperation>} Operación guardada
 */
export const saveOperation = async (operationData: OperationData): Promise<SavedOperation> => {
  try {
    // POST /api/calc - Guardar operación en el historial
    const response = await fetch(`${API_BASE_URL}/api/calc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        a: operationData.operand1,
        b: operationData.operand2,
        op: operationData.operator, // 'add', 'subtract', 'multiply', 'divide'
        result: operationData.result,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar la operación');
    }

    const responseData = await response.json();
    
    // Mapear respuesta del backend a nuestro formato
    return {
      id: responseData._id || responseData.id,
      operand1: operationData.operand1,
      operand2: operationData.operand2,
      operator: operationData.operator,
      result: operationData.result,
      operationString: operationData.operationString,
      timestamp: responseData.timestamp || new Date().toISOString(),
    };
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
 * Interfaz para la respuesta del historial del backend
 * Estructura exacta del backend tal cual como se recibe
 */
interface HistoryResponse {
  ok: boolean;
  items: Array<{
    meta: {
      ip: string;
      userAgent: string;
    };
    _id: string;
    op: OperatorCode;
    a: number;
    b: number;
    result: number;
    ok: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Obtiene el historial de operaciones desde MongoDB
 * @param {number} limit - Número máximo de operaciones a obtener
 * @param {OperatorCode} operator - Filtro opcional por operador
 * @returns {Promise<SavedOperation[]>} Array de operaciones
 */
export const getHistory = async (limit: number = 50, operator?: OperatorCode): Promise<SavedOperation[]> => {
  try {
    // GET /api/records - Listar historial (con filtro opcional por operador)
    let url = `${API_BASE_URL}/api/records`;
    const params = new URLSearchParams();
    if (operator) {
      params.append('op', operator);
    }
    if (limit) {
      params.append('limit', limit.toString());
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el historial');
    }

    const data: HistoryResponse = await response.json();
    
    // El backend devuelve { ok: true, items: [...], total, page, limit, pages }
    if (data.ok && Array.isArray(data.items)) {
      // Mapear items del backend a nuestro formato
      return data.items.map((item) => ({
        id: item._id,
        operand1: item.a,
        operand2: item.b,
        operator: item.op,
        result: item.result,
        operationString: `${item.a} ${item.op} ${item.b} = ${item.result}`,
        timestamp: item.createdAt || item.updatedAt || new Date().toISOString(),
      }));
    }
    
    return [];
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
    // DELETE /api/records/:id - Eliminar operación específica
    const response = await fetch(`${API_BASE_URL}/api/records/${id}`, {
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
    // DELETE /api/records - Eliminar todo el historial
    const response = await fetch(`${API_BASE_URL}/api/records`, {
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

