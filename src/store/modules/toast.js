import { useToast} from "vue-toastification";

const toast = useToast();

export default {
    namespaced:true,
    actions: {
        success(_, message) {
            toast.success(message, {

               timeout: 2000,
            });
        },
        error(_, message) {
            toast.error(message,{

                timeout: 500,
            });
        },
        warning(_, message) {
            toast.warning(message,{

                timeout: 1500,
            });
        },
        info(_, message) {
            toast.info(message,{

                timeout: 1000,
            });
        },

        }
    }