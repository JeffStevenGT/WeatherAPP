import axios from "axios";
import { procesarDatosPronostico } from "../utilidades/formateadores";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const URL_CLIMA_ACTUAL = "https://api.openweathermap.org/data/2.5/weather";
const URL_PRONOSTICO = "https://api.openweathermap.org/data/2.5/forecast";

export const obtenerClima = async (ciudad, unidades = "metric") => {
  try {
    const [lat, lon] = await obtenerCoordenadas(ciudad);
    const respuestaActual = await axios.get(
      `${URL_CLIMA_ACTUAL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unidades}`
    );
    const respuestaPronostico = await axios.get(
      `${URL_PRONOSTICO}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unidades}`
    );
    const datosProcesados = procesarDatosPronostico(
      respuestaActual.data,
      respuestaPronostico.data
    );
    return { success: true, data: datosProcesados };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const obtenerCoordenadas = async (ciudad) => {
  const respuesta = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=1&appid=${API_KEY}`
  );
  if (respuesta.data.length === 0) throw new Error("Ciudad no encontrada");
  return [respuesta.data[0].lat, respuesta.data[0].lon];
};
