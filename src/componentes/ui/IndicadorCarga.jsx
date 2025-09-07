const IndicadorCarga = () => (
  <div className="flex justify-center items-center h-20">
    <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  </div>
);

export default IndicadorCarga;
