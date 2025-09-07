import { useState, useEffect } from "react";
import { obtenerClima } from "../servicios/apiClima";

export const useClima = (ciudad, sistemaUnidades) => {
  const [pronostico, setPronostico] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPronostico = async () => {
      setCargando(true);
      setError(null);
      try {
        const resultado = await obtenerClima(ciudad, sistemaUnidades);
        if (resultado.success) {
          setPronostico(resultado.data || []);
        } else {
          setError(resultado.error || "Error al obtener datos del clima");
        }
      } catch (err) {
        setError("Error en la conexión con el servidor");
      } finally {
        setCargando(false);
      }
    };
    fetchPronostico();
  }, [ciudad, sistemaUnidades]);

  return { pronostico, cargando, error };
};
