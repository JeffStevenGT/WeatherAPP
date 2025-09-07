const IndicadorHumedad = ({ humedad }) => (
  <>
    <div className="text-xs lg:text-sm justify-between flex text-gray-300 dark:text-gray-700">
      <span>0</span>
      <span>50</span>
      <span>100</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2 mt-1 dark:bg-gray-500">
      <div
        className="bg-yellow-400 h-2 rounded-full"
        style={{ width: `${humedad}%` }}
      />
    </div>
    <span className="text-xs lg:text-sm justify-end flex text-gray-300 dark:text-gray-700 mt-1">
      %
    </span>
  </>
);

export default IndicadorHumedad;
