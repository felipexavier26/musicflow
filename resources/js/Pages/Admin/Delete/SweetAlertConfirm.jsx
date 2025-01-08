import Swal from "sweetalert2";

export default function SweetAlertConfirm({ title, text, icon, confirmButtonText, cancelButtonText, onConfirm, onCancel }) {
  const showAlert = () => {
    Swal.fire({
      title: title || "Tem certeza?",
      text: text || "Esta ação não pode ser desfeita!",
      icon: icon || "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: confirmButtonText || "Sim, excluir!",
      cancelButtonText: cancelButtonText || "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) onConfirm();
      } else if (onCancel) {
        onCancel();
      }
    });
  };

  return (
    <button onClick={showAlert} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
      Excluir
    </button>
  );
}
