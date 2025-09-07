import {
  obtenerCiudadPorIP,
  obtenerCiudadPorGeolocalizacion,
} from "../servicios/apiGeolocalizacion";

export const useUbicacion = () => {
  const obtenerUbicacion = async () => {
    try {
      const datosIP = await obtenerCiudadPorIP();
      if (datosIP.city && datosIP.country) {
        return `${datosIP.city}, ${datosIP.country}`;
      }
      const datosGeo = await obtenerCiudadPorGeolocalizacion();
      if (datosGeo) return datosGeo;
      throw new Error("No se pudo determinar la ciudad");
    } catch (error) {
      throw new Error("Error al obtener ubicación");
    }
  };

  return { obtenerUbicacion };
};
