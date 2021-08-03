import registrationInstance from '../instance'

const postUser = ({
                    companyId,
                    userName,
                    password,
                    roles,
                    active,
                    fullName,
                    description,
                  }, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.post('/users',
      {
        companyId,
        userName,
        password,
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

export default postUser
