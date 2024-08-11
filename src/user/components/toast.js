import { toast } from 'react-hot-toast';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-center',
    style: {
      backgroundColor: 'white',
      color: 'black',
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'top-center',
    style: {
      backgroundColor: 'red',
      color: 'white',
    },
  });
};