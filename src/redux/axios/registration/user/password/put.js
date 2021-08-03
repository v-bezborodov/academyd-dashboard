import registrationInstance from '../../instance'

const putPassword = ({ id, password }, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.put('/users/' + id + '/password',
      {
        password,
      })
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default putPassword
