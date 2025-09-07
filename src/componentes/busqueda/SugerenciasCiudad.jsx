const SugerenciasCiudad = ({ sugerencias, onClickSugerencia }) => {
  if (sugerencias.length === 0) return null;

  return (
    <div className="absolute z-10 mt-2 w-full bg-gray-700 rounded-lg shadow-lg overflow-hidden dark:bg-blue-300">
      {sugerencias.map((sugerencia, index) => (
        <div
          key={`${sugerencia.name}-${sugerencia.country}-${index}`}
          onClick={() => onClickSugerencia(sugerencia)}
          className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex justify-between text-white dark:text-gray-900 dark:hover:bg-blue-200"
        >
          <span>{sugerencia.name}</span>
          <span className="text-gray-400 dark:text-gray-700">
            {sugerencia.country}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SugerenciasCiudad;
