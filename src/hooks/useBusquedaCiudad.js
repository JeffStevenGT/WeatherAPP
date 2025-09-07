import { useState } from "react";
import { obtenerSugerenciasCiudades } from "../servicios/apiGeolocalizacion";

export const useBusquedaCiudad = () => {
  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando] = useState(false);

  const buscarSugerencias = async (consulta) => {
    if (consulta.length < 2) {
      setSugerencias([]);
      return;
    }
    setCargando(true);
    try {
      const data = await obtenerSugerenciasCiudades(consulta);
      setSugerencias(data);
    } catch (error) {
      setSugerencias([]);
    } finally {
      setCargando(false);
    }
  };

  return { sugerencias, cargando, buscarSugerencias };
};
