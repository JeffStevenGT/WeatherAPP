import axios from "axios";

const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const obtenerCiudadPorIP = async () => {
  const respuesta = await axios.get(
    `https://ipinfo.io/json?token=${IPINFO_TOKEN}`
  );
  return respuesta.data;
};

export const obtenerCiudadPorGeolocalizacion = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (posicion) => {
        try {
          const respuesta = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${posicion.coords.latitude}&lon=${posicion.coords.longitude}&limit=1&appid=${API_KEY}`
          );
          if (respuesta.data.length > 0) {
            resolve(`${respuesta.data[0].name}, ${respuesta.data[0].country}`);
          } else {
            reject(new Error("No se pudo determinar la ciudad"));
          }
        } catch (error) {
          reject(error);
        }
      },
      (err) => reject(err)
    );
  });

export const obtenerSugerenciasCiudades = async (consulta) => {
  const respuesta = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${consulta}&limit=5&appid=${API_KEY}`
  );
  return respuesta.data;
};
