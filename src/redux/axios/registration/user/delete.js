import registrationInstance from '../instance'

const deleteUser = (id, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.delete('/users/' + id)
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default deleteUser
