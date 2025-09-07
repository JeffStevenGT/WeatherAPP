import { useState, useRef, useEffect } from "react";
import SugerenciasCiudad from "./SugerenciasCiudad";
import { useBusquedaCiudad } from "../../hooks/useBusquedaCiudad";

const BuscadorCiudad = ({ ciudad, setCiudad }) => {
  const [valorEntrada, setValorEntrada] = useState("");
  const [buscando, setBuscando] = useState(false);
  const refBusqueda = useRef(null);
  const refEntrada = useRef(null);
  const { sugerencias, cargando, buscarSugerencias } = useBusquedaCiudad();

  useEffect(() => {
    const manejarClickFuera = (event) => {
      if (refBusqueda.current && !refBusqueda.current.contains(event.target)) {
        cancelar();
      }
    };
    if (buscando) {
      document.addEventListener("mousedown", manejarClickFuera);
    }
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, [buscando]);

  useEffect(() => {
    if (buscando && refEntrada.current) {
      refEntrada.current.focus();
    }
  }, [buscando]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (valorEntrada.trim() && buscando) {
        buscarSugerencias(valorEntrada.trim());
      }
    }, 300);
    return () => clearTimeout(temporizador);
  }, [valorEntrada, buscando, buscarSugerencias]);

  const manejarClickBusqueda = () => setBuscando(true);

  const cancelar = () => {
    setBuscando(false);
    setValorEntrada("");
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (valorEntrada.trim()) {
      await buscarSugerencias(valorEntrada.trim());
    }
  };

  const manejarClickSugerencia = (sugerencia) => {
    setCiudad(`${sugerencia.name}, ${sugerencia.country}`);
    cancelar();
  };

  return (
    <div className="relative" ref={refBusqueda}>
      {!buscando ? (
        <button
          onClick={manejarClickBusqueda}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-gray-500 text-gray-900 hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-sm dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-sm text-white md:text-base">Buscar ciudad</span>
        </button>
      ) : (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-16 px-4 md:pt-20 lg:w-[30%] lg:min-w-[380px]">
          <form
            onSubmit={manejarEnvio}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <input
                ref={refEntrada}
                type="text"
                value={valorEntrada}
                onChange={(e) => setValorEntrada(e.target.value)}
                placeholder="Ingresa una ciudad..."
                className="w-full p-3 px-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none rounded-lg dark:text-white dark:placeholder-gray-400"
              />
              <div className="flex gap-2 pr-2">
                <button
                  type="button"
                  onClick={cancelar}
                  className="p-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <SugerenciasCiudad
              sugerencias={sugerencias}
              onClickSugerencia={manejarClickSugerencia}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default BuscadorCiudad;
