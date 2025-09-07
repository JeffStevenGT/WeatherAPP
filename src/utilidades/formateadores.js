export const procesarDatosPronostico = (datosActual, datosPronostico) => {
  const listaPronostico = datosPronostico.list || [];
  const pronosticoDiario = {};
  const datosMediodia = {};

  // Datos por defecto para evitar undefined
  const datosPorDefecto = {
    icon: "01d",
    description: "Desconocido",
    weather_main: "Clear",
    temp: 0,
    feels_like: 0,
  };

  // Procesar datos de mediodía
  listaPronostico.forEach((item) => {
    const [fecha, hora] = item.dt_txt.split(" ");
    if (hora === "12:00:00") {
      datosMediodia[fecha] = {
        icon: item.weather[0]?.icon || datosPorDefecto.icon,
        description:
          item.weather[0]?.description || datosPorDefecto.description,
        weather_main: item.weather[0]?.main || datosPorDefecto.weather_main,
        temp: item.main.temp || datosPorDefecto.temp,
        feels_like: item.main.feels_like || datosPorDefecto.feels_like,
      };
    }
  });

  // Procesar datos diarios
  listaPronostico.forEach((item) => {
    const [fecha, hora] = item.dt_txt.split(" ");
    if (!pronosticoDiario[fecha]) {
      const tieneDatosMediodia = datosMediodia[fecha] !== undefined;

      pronosticoDiario[fecha] = {
        date: fecha,
        temp_min: item.main.temp_min || 0,
        temp_max: item.main.temp_max || 0,
        temp: item.main.temp || 0,
        feels_like: item.main.feels_like || 0,
        humidity: item.main.humidity || 0,
        pressure: item.main.pressure || 0,
        icon: tieneDatosMediodia
          ? datosMediodia[fecha].icon
          : item.weather[0]?.icon || datosPorDefecto.icon,
        description: tieneDatosMediodia
          ? datosMediodia[fecha].description
          : item.weather[0]?.description || datosPorDefecto.description,
        weather_main: tieneDatosMediodia
          ? datosMediodia[fecha].weather_main
          : item.weather[0]?.main || datosPorDefecto.weather_main,
        wind_speed: item.wind.speed || 0,
        wind_deg: item.wind.deg || 0,
        wind_gust: item.wind.gust || 0,
        visibility: item.visibility || 10000,
        clouds: item.clouds.all || 0,
        pop: item.pop || 0,
        city: datosPronostico.city?.name || "Desconocido",
        country: datosPronostico.city?.country || "",
        sunrise: datosPronostico.city?.sunrise || 0,
        sunset: datosPronostico.city?.sunset || 0,
        timezone: datosPronostico.city?.timezone || 0,
        observation_time: tieneDatosMediodia ? "12:00:00" : hora,
      };
    } else {
      if (item.main.temp_min < pronosticoDiario[fecha].temp_min) {
        pronosticoDiario[fecha].temp_min = item.main.temp_min;
      }
      if (item.main.temp_max > pronosticoDiario[fecha].temp_max) {
        pronosticoDiario[fecha].temp_max = item.main.temp_max;
      }
    }
  });

  // Procesar días sin datos de mediodía
  Object.keys(pronosticoDiario).forEach((fecha) => {
    if (!datosMediodia[fecha]) {
      const masCercanoAMediodia = listaPronostico
        .filter((item) => item.dt_txt.startsWith(fecha))
        .filter((item) => {
          const hora = parseInt(item.dt_txt.split(" ")[1].split(":")[0]);
          return hora >= 9 && hora <= 15;
        })
        .sort((a, b) => {
          const horaA = Math.abs(
            12 - parseInt(a.dt_txt.split(" ")[1].split(":")[0])
          );
          const horaB = Math.abs(
            12 - parseInt(b.dt_txt.split(" ")[1].split(":")[0])
          );
          return horaA - horaB;
        })[0];

      if (masCercanoAMediodia) {
        pronosticoDiario[fecha].icon =
          masCercanoAMediodia.weather[0]?.icon || datosPorDefecto.icon;
        pronosticoDiario[fecha].description =
          masCercanoAMediodia.weather[0]?.description ||
          datosPorDefecto.description;
        pronosticoDiario[fecha].weather_main =
          masCercanoAMediodia.weather[0]?.main || datosPorDefecto.weather_main;
        pronosticoDiario[fecha].observation_time =
          masCercanoAMediodia.dt_txt.split(" ")[1];
      }
    }
  });

  // Procesar datos actuales
  const datosActuales = {
    date: new Date(datosActual.dt * 1000).toISOString().split("T")[0],
    temp: datosActual.main?.temp || 0,
    temp_min: datosActual.main?.temp_min || 0,
    temp_max: datosActual.main?.temp_max || 0,
    feels_like: datosActual.main?.feels_like || 0,
    humidity: datosActual.main?.humidity || 0,
    pressure: datosActual.main?.pressure || 0,
    icon: datosActual.weather[0]?.icon || datosPorDefecto.icon,
    description:
      datosActual.weather[0]?.description || datosPorDefecto.description,
    weather_main: datosActual.weather[0]?.main || datosPorDefecto.weather_main,
    wind_speed: datosActual.wind?.speed || 0,
    wind_deg: datosActual.wind?.deg || 0,
    wind_gust: datosActual.wind?.gust || 0,
    visibility: datosActual.visibility || 10000,
    clouds: datosActual.clouds?.all || 0,
    city: datosActual.name || "Desconocido",
    country: datosActual.sys?.country || "",
    sunrise: datosActual.sys?.sunrise || 0,
    sunset: datosActual.sys?.sunset || 0,
    timezone: datosActual.timezone || 0,
    observation_time: new Date(datosActual.dt * 1000)
      .toISOString()
      .split("T")[1]
      .split(".")[0],
  };

  // Combinar datos actuales con pronósticos, limitando a 6 días
  const datosCombinados = [
    datosActuales,
    ...Object.values(pronosticoDiario).slice(0, 5),
  ];
  return datosCombinados;
};
