import { TypeOptions, toast } from "react-toastify";

const toast_notification = (message: string, Type : TypeOptions = 'success') => {
    toast( message, {
        type: Type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}

export default toast_notification