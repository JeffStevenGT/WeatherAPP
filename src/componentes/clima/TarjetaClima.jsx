import { useFormatoFecha } from "../../hooks/useFormatoFecha";
import IndicadorCarga from "../ui/IndicadorCarga";

const TarjetaClima = ({ datosDia, sistemaUnidades, climaActual }) => {
  const unidadTemp = sistemaUnidades === "metric" ? "°C" : "°F";
  const { formatearFecha } = useFormatoFecha();
  const datosClima = climaActual || datosDia;

  if (!datosClima || !datosClima.icon || !datosClima.description) {
    return <IndicadorCarga />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-full pt-9 px-6 md:px-6">
      <img
        src={`/clima/${datosClima.icon}.png`}
        alt={datosClima.description}
        className=" h-[100px] md:h-[110px] object-contain"
      />
      <div className="w-full flex flex-col justify-center items-center pt-6 md:pt-8 pb-12 md:pb-16">
        <div className="flex p-3 md:p-4">
          <span className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white dark:text-gray-900">
            {Math.round(datosClima.temp)}
          </span>
          <span className="text-gray-400 dark:text-gray-700 items-center flex text-4xl md:text-5xl lg:text-6xl">
            {unidadTemp}
          </span>
        </div>
        <p className="text-gray-400 dark:text-gray-800 text-2xl md:text-3xl lg:text-4xl font-semibold p-3 md:p-4 capitalize">
          {datosClima.description}
        </p>
        <h3 className="text-gray-400 dark:text-gray-800 text-base md:text-lg lg:text-xl p-2">
          Hoy • {formatearFecha(datosClima.date)}
        </h3>
        <div className="text-gray-400 dark:text-gray-800 p-2 flex gap-2 items-center text-base md:text-lg">
          <img
            src="/iconos/location_on.svg"
            alt="Ubicación"
            className="h-5 w-5 dark:bg-gray-900/20 rounded-full"
          />
          <span>{datosClima.city}</span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaClima;
