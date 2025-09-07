import { useState } from "react";
import { useUbicacion } from "../../hooks/useUbicacion";

const BotonUbicacion = ({ setCiudad }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const { obtenerUbicacion } = useUbicacion();

  const manejarClick = async () => {
    setCargando(true);
    setError(null);
    try {
      const ciudadObtenida = await obtenerUbicacion();
      if (ciudadObtenida) setCiudad(ciudadObtenida);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={manejarClick}
        disabled={cargando}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors dark:bg-blue-300 dark:text-gray-900 dark:hover:bg-blue-200"
        aria-label="Obtener mi ubicación"
      >
        {cargando ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        ) : (
          <img
            src="/iconos/location.svg"
            alt="Ubicación"
            className="p-2 cursor-pointer"
          />
        )}
      </button>
      {error && (
        <div className="absolute top-full mt-2 right-0 w-64 p-2 bg-red-100 text-red-800 text-sm rounded shadow-lg z-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default BotonUbicacion;
