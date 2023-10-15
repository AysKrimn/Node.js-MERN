import React, { createContext, useState } from 'react'

// PROVIDER
export const AuthProvider = createContext()



export default function UserContext(props) {

  // login olmayan herkes nulldur.
  const [ user, setUser ] = useState(null)

  return (
  
    <>
    
            <AuthProvider.Provider value={{ user, setUser}}>

                    {props.children}

            </AuthProvider.Provider>
    
    </>
  )
}
