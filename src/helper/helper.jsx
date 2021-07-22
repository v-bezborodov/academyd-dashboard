import { toast } from 'react-toastify';

export const notifyToast = (message = [], type = 'success') => {
    if (typeof message === 'object') {
        Object.keys(message).map(function(key, index) {
            if (type==='error') {
                message[key][0] && toast.error(message[key][0]);
            }
            else{
                message[key][0] && toast.success(message[key][0]);
            }
        });
    }else{

        if (type === 'error') {
            toast.error(message)
        }else{
            toast.success(message)
        }


    }
}

export const retrieveErrorFromApi = (error) => {
    let errorMessage = []

    if (error?.response?.data?.message) {
            return error.response.data.message
    }

    return errorMessage
}