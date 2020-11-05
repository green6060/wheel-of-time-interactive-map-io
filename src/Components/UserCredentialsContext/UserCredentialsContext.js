import React from 'react';
import { axiosLogin, UserContext } from '../../Helper/common'

export const UserCredentialsContext = ({ children }) => {
  // #I've chosen to use a combined effort of functional component state management
  // and Context, to manage global data.

  // Here, you can see useState hook in use
    const [userStatus, setUserStatus] = React.useState({
        loggedIn: false,
        email: undefined,
    })

    // #Here, we have a couple of arrow functions being stored in the Login and Logout const variables
    const login = (emailAttempt, passwordAttempt) => {
        axiosLogin(emailAttempt, passwordAttempt)
        .then(response => {
            if(response.status === 200) {
                // set success message to response.data
                setUserStatus({loggedIn: true, email: emailAttempt})
            } else if (response.status === 401) {
                console.log(response)
                // set error message to error.data
            }
        })
        .catch(error => {
            console.log(error)
            // set error message to error.data
        })
    }

    const logout = () => {
        setUserStatus({loggedIn: false, email: userStatus.email})
    }

    return (
        <UserContext.Provider value={{ 
            userStatus,
            login,
            logout,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserCredentialsContext;
