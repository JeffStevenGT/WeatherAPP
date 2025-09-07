export const useFormatoFecha = () => {
  const formatearFecha = (cadenaFecha, indiceDia = 0) => {
    const fecha = new Date(cadenaFecha);
    if (indiceDia === 0) return "Mañana";
    const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "short" });
    const dia = fecha.getDate();
    const mes = fecha.toLocaleDateString("es-ES", { month: "short" });
    return `${diaSemana}, ${dia} ${mes}`;
  };

  return { formatearFecha };
};
