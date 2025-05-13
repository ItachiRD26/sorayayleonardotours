const API_KEY = process.env.NEXT_PUBLIC_API_CURRENCY; // Usamos la variable de entorno
const BASE_URL = 'https://api.currencyapi.com/v3/latest';

export const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
  try {
    // Verificamos que la API_KEY esté definida
    if (!API_KEY) {
      throw new Error('API key no está definida en las variables de entorno.');
    }

    // Hacemos la solicitud a la API de CurrencyAPI
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener las tasas de cambio');
    }

    // Verificamos si la moneda de destino está en la respuesta
    const rate = data.data[to]?.value;
    if (!rate) {
      throw new Error(`No se encontró la tasa de cambio para ${to}`);
    }

    // Realizamos la conversión
    return amount * rate;
  } catch (error) {
    console.error('Error en la conversión de divisas:', error);
    throw error;
  }
};