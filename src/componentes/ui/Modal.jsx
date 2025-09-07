const Modal = ({ abierto, onCerrar, children }) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl dark:bg-blue-300">
        {children}
        <button
          onClick={onCerrar}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
