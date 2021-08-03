import registrationInstance from '../instance'

const putUser = ({
                   id,
                   companyId,
                   userName,
                   roles,
                   active,
                   fullName,
                   description,
                 }, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.put('/users/' + id,
      {
        companyId,
        userName,
        roles,
        active,
        fullName,
        description,
      })
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default putUser
