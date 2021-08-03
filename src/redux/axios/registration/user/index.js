import registrationInstance from '../instance'

const fetchAllUsers = (role = null, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.get('/users' + (role ? '?role=' + role : ''))
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default fetchAllUsers
