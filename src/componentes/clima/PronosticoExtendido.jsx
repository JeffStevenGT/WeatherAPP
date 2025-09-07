import PronosticoDiario from "./PronosticoDiario";
import SelectorTemperatura from "../ui/SelectorTemperatura";

const PronosticoExtendido = ({
  sistemaUnidades,
  setSistemaUnidades,
  datosPronostico,
  cargando,
}) => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-4 max-w-5xl">
      <div className="flex justify-end mb-4 md:mb-6 lg:mb-8 px-4 md:px-8 ">
        <SelectorTemperatura
          sistemaUnidades={sistemaUnidades}
          setSistemaUnidades={setSistemaUnidades}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        {cargando
          ? [...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 snap-center">
                <EsqueletoPronosticoDiario />
              </div>
            ))
          : datosPronostico.map((datosDia, indice) => (
              <div
                key={`${datosDia.dt}-${indice}`}
                className="flex-shrink-0 snap-center"
              >
                <PronosticoDiario
                  datosDia={datosDia}
                  sistemaUnidades={sistemaUnidades}
                  indice={indice}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default PronosticoExtendido;
