import React, { useReducer, createContext } from 'react'

const authContext = createContext({
    user: null, 
    login: (data) => {},
    logout: () => {}
})


function authReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
            
        
        default: 
            return state
    }
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const login = (data) => {
        dispatch({
            type: 'LOGIN',
            payload: data
        })
    }

    const logout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <authContext.Provider value={{
            user: state.user,
            login,
            logout
        }}>
            {children}
        </authContext.Provider>
    )
}

export { authContext, AuthProvider }