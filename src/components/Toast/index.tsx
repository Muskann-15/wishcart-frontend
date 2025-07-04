import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
