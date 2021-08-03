import registrationInstance from '../instance'

const fetchUser = (callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.get('/users/self')
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default fetchUser
