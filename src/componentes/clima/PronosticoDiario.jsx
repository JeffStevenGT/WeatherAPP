import { useFormatoFecha } from "../../hooks/useFormatoFecha";

const PronosticoDiario = ({ datosDia, sistemaUnidades, indice }) => {
  const unidadTemp = sistemaUnidades === "metric" ? "°C" : "°F";
  const { formatearFecha } = useFormatoFecha();

  return (
    <div className="text-sm md:text-base w-[100px] md:w-[120px] lg:w-[140px] bg-gray-800 dark:bg-blue-200 px-2 py-3 md:py-4 text-white dark:text-gray-900 flex flex-col justify-center items-center rounded-lg shadow-sm dark:border dark:border-gray-900 transition-all duration-300">
      <h3 className="text-xs md:text-sm">
        {formatearFecha(datosDia.date, indice)}
      </h3>
      <img
        src={`/clima/${datosDia.icon}.png`}
        alt={datosDia.description}
        className="h-[60px] md:h-[80px] lg:h-[100px] py-2 md:py-3 object-contain "
      />
      <div className="flex gap-2 md:gap-3">
        <span className="text-base md:text-lg">
          {Math.round(datosDia.temp_max)}
          {unidadTemp}
        </span>
        <span className="text-gray-400 dark:text-gray-700 text-xs md:text-sm">
          {Math.round(datosDia.temp_min)}
          {unidadTemp}
        </span>
      </div>
    </div>
  );
};

export default PronosticoDiario;
