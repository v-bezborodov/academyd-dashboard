import registrationInstance from '../../instance'

const fetchRoles = (callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.get('/users/roles')
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default fetchRoles
