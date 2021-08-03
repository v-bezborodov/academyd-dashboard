const requestInterceptor = config => {

  if (localStorage.accessToken) {
    config.headers['Authorization'] = `Bearer ${localStorage.accessToken}`
  }
  return config
}

export default requestInterceptor
