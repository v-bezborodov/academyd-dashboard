const responseInterceptor = error => {

    // const originalRequest = error.config

    if (error.response.status !== 401) {
        return Promise.reject(error)
    }

    if (error.response.status === 401) {
        window.location.replace('/');
        return Promise.reject(error)
    }

    return Promise.reject(error)
}

export default responseInterceptor
