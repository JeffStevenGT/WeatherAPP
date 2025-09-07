import { useState } from "react";
import { useClima } from "../hooks/useClima";
import TarjetaClima from "../componentes/clima/TarjetaClima";
import PronosticoExtendido from "../componentes/clima/PronosticoExtendido";
import ParametrosClimaticos from "../componentes/parametros/ParametrosClimaticos";
import BuscadorCiudad from "../componentes/busqueda/BuscadorCiudad";
import BotonUbicacion from "../componentes/ui/BotonUbicacion";
import SelectorTemperatura from "../componentes/ui/SelectorTemperatura";

const Inicio = () => {
  const [ciudad, setCiudad] = useState("Buenos Aires");
  const [sistemaUnidades, setSistemaUnidades] = useState("metric");
  const { pronostico, cargando, error } = useClima(ciudad, sistemaUnidades);

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 flex flex-col overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-[30%] lg:min-w-[380px] bg-gray-800 dark:bg-blue-200 relative flex flex-col">
          <div className="flex p-4 justify-between w-full items-center absolute z-10 md:px-10 lg:px-16">
            <BuscadorCiudad ciudad={ciudad} setCiudad={setCiudad} />
            <div className="md:hidden flex items-center gap-3">
              <BotonUbicacion setCiudad={setCiudad} />
            </div>
            <div className="hidden md:block">
              <BotonUbicacion setCiudad={setCiudad} />
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <img
              src="/iconos/Cloud-background.png"
              alt="nubes"
              className="absolute  w-full object-cover opacity-20 dark:opacity-85 top-10 left-0"
            />
            {pronostico[0] && (
              <TarjetaClima
                datosDia={pronostico[0]}
                sistemaUnidades={sistemaUnidades}
                climaActual={pronostico[0]}
              />
            )}
          </div>
        </div>
        <div className="lg:w-[70%] bg-gray-900 dark:bg-gray-100 flex flex-col items-center ">
          <PronosticoExtendido
            sistemaUnidades={sistemaUnidades}
            setSistemaUnidades={setSistemaUnidades}
            datosPronostico={pronostico.slice(1)}
          />
          {pronostico[0] && (
            <div className="w-full px-4 md:px-8 lg:px-12 max-w-5xl">
              <ParametrosClimaticos
                datosDia={pronostico[0]}
                sistemaUnidades={sistemaUnidades}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
