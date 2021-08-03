import registrationInstance from '../../instance'

const putCompany = ({
                      companyId,
                      name,
                      street,
                      house,
                      place,
                      zipCode,
                      phonePrefix,
                      phoneNumber,
                      fax,
                      taxId,
                      email,
                      fullName,
                      ownerPhoneNumber,
                    }, callbackSuccess, callbackError) => {
  return dispatch => {
    registrationInstance.put('/users/company/' + companyId,
      {
        name,
        street,
        house,
        place,
        zipCode,
        phonePrefix,
        phoneNumber,
        fax,
        taxId,
        email,
        fullName,
        ownerPhoneNumber,
      })
      .then(res => {
        typeof callbackSuccess == 'function' && callbackSuccess(res)
      })
      .catch(error => {
        typeof callbackError == 'function' && callbackError(error)
      })
  }
}

export default putCompany
