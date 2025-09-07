import { useState, useEffect } from "react";

const SelectorTemperatura = ({ sistemaUnidades, setSistemaUnidades }) => {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [modoOscuro]);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex pr-4">
        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="p-2.5 rounded-full bg-blue-200 text-gray-900 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 shadow-sm"
          aria-label={
            modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
        >
          {modoOscuro ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSistemaUnidades("metric")}
          className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center transition-all duration-300 ease-in-out ${
            sistemaUnidades === "metric"
              ? "bg-blue-400 text-white font-bold shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setSistemaUnidades("imperial")}
          className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center transition-all duration-300 ease-in-out ${
            sistemaUnidades === "imperial"
              ? "bg-blue-400 text-white font-bold shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default SelectorTemperatura;
