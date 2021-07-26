import eventInstance from "./instance";

const eventShow = (id, callbackSuccess, callbackError) => {
    return eventInstance.get('api/event/' + id)
            .then((res) => {
                if (res.data) typeof callbackSuccess === 'function' && callbackSuccess(res.data)
            })
            .catch(error => {
                typeof callbackError === 'function' && callbackError(error)
            })

}

export default eventShow;

// fetchUsersWithFetchAPI = () => {
//     this.setState({...this.state, isFetching: true});
//     fetch(USER_SERVICE_URL)
//         .then(response => response.json())
//         .then(result => {
//             this.setState({users: result, isFetching: false})
//         })
//         .catch(e => {
//             console.log(e);
//             this.setState({...this.state, isFetching: false});
//         });
// };
// fetchUsers = this.fetchUsersWithFetchAPI

