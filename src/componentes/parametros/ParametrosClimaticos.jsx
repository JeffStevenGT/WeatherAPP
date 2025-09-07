import IndicadorHumedad from "./IndicadorHumedad";

const ParametrosClimaticos = ({ datosDia, sistemaUnidades }) => {
  if (!datosDia)
    return (
      <div className="text-center text-gray-400 dark:text-gray-700">
        Cargando parámetros...
      </div>
    );

  const unidadVelocidad = sistemaUnidades === "metric" ? "m/s" : "mph";
  const unidadVisibilidad = sistemaUnidades === "metric" ? "km" : "miles";
  const visibilidad =
    sistemaUnidades === "metric"
      ? (datosDia.visibility / 1000).toFixed(2)
      : (datosDia.visibility / 1609).toFixed(2);

  const obtenerDireccionViento = (grados) => {
    const direcciones = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const indice = Math.round(grados / 45) % 8;
    return direcciones[indice];
  };

  return (
    <div className="flex flex-col text-white dark:text-gray-900 justify-center items-center w-full px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-5xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold py-3 md:py-4 lg:py-6 dark:font-bold">
          Destacados de hoy
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
          <div className="bg-gray-800 dark:bg-blue-200 p-3 md:p-4 rounded-lg text-center shadow-sm dark:border dark:border-gray-900 transition-all duration-300">
            <p className="text-gray-400 dark:text-gray-700 text-sm md:text-base">
              Estado del viento
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold p-2 md:p-3">
              {datosDia.wind_speed.toFixed(2)}
              <span className="text-sm md:text-base"> {unidadVelocidad}</span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="flex justify-center items-center w-7 h-7 rounded-full bg-white/30 dark:bg-gray-900/30"
                style={{ transform: `rotate(${datosDia.wind_deg}deg)` }}
              >
                <img
                  src="/iconos/navigation.svg"
                  alt="Dirección del viento"
                  className="w-4 h-4"
                />
              </div>
              <span className="text-sm md:text-base">
                {obtenerDireccionViento(datosDia.wind_deg)}
              </span>
            </div>
          </div>
          <div className="bg-gray-800 dark:bg-blue-200 p-3 md:p-4 rounded-lg text-center shadow-sm dark:border dark:border-gray-900 transition-all duration-300">
            <p className="text-gray-400 dark:text-gray-700 text-sm md:text-base">
              Humedad
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold p-2 md:p-3">
              {datosDia.humidity}
              <span className="text-sm md:text-base">%</span>
            </p>
            <IndicadorHumedad humedad={datosDia.humidity} />
          </div>
          <div className="bg-gray-800 dark:bg-blue-200 p-3 md:p-4 rounded-lg text-center shadow-sm dark:border dark:border-gray-900 transition-all duration-300">
            <p className="text-gray-400 dark:text-gray-700 text-sm md:text-base">
              Visibilidad
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold p-2 md:p-3">
              {visibilidad}
              <span className="text-sm md:text-base"> {unidadVisibilidad}</span>
            </p>
          </div>
          <div className="bg-gray-800 dark:bg-blue-200 p-3 md:p-4 rounded-lg text-center shadow-sm dark:border dark:border-gray-900 transition-all duration-300">
            <p className="text-gray-400 dark:text-gray-700 text-sm md:text-base">
              Presión del aire
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold p-2 md:p-3">
              {datosDia.pressure}
              <span className="text-sm md:text-base"> hPa</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs md:text-sm p-4 text-gray-300 dark:text-gray-700">
        Creado por <span className="font-bold">Jeff Gil</span>
      </p>
    </div>
  );
};

export default ParametrosClimaticos;
