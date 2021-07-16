import { toast } from 'react-toastify';

export const notifyToast = (toasts = [], type = 'success') => {
    if (typeof toasts === 'object') {
        Object.keys(toasts).map(function(key, index) {
            if (type==='error') {
                toasts[key][0] && toast.error(toasts[key][0]);
            }
            else{
                toasts[key][0] && toast.success(toasts[key][0]);
            }
        });
    }else{
        toast.info('Something was done but can\'t say what')
    }
}

export const retrieveErrorFromApi = (error) => {
    let errorMessage = []

    if (error?.response?.data?.message) {
            return error.response.data.message
    }

    return errorMessage
}