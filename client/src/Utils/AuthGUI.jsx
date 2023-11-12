import React, { useContext, useEffect, useState } from 'react'
import ChangeUserAvatar from '../Components/ChangeUserAvatar'
import { AuthProvider } from '../Context/UserContext'
import HandleUserRank from '../Components/HandleUserRank'
import DeleteTweet from '../Components/DeleteTweet'
import CreateTweetModal from '../Components/CreateTweetModal'



export default function AuthGUI(props) {

  
  const [component, setComponent] = useState(null)
  const { user } = useContext(AuthProvider)
  const { tweet, userId, sessionId, label } = props

  // sessionId = güncel oturumdaki userin idsine eşittir
  // userId ise ilgili kişinin idsine eşittir (tweet yazarının idsi vs)

  // eğer user anomimse çalışma
  if (user === null) return;

  // user.roles'ün bir tane kopyasını al
  const userRoles = [...user.roles]

  const GUIS = [

        {
            label: "edit_user_avatar",
            element: <ChangeUserAvatar sessionId = {sessionId} userId = {userId}></ChangeUserAvatar>,
            allowed: ["Admin", "Self"]
        }, 
        
        {

           label: "edit_user_rank",
           element: <HandleUserRank></HandleUserRank>,
           allowed: ["Admin"]
        },

        {
            label: "delete_tweet",
            element: <DeleteTweet tweet = {tweet}> </DeleteTweet>,
            allowed: ["Admin", "Self"]
        },

        {
            label: "create_tweet",
            element: <CreateTweetModal user = {user}></CreateTweetModal>,
            allowed: ["User"]
        }
  ]


  console.log("userId:", userId)
  console.log("context userId", user.user_id)
  if (userId === user.user_id) {

        userRoles.push("Self")
  }


  useEffect(() => {

        const isAuthenticated = GUIS.find((gui) => gui.label === label && gui.allowed.some((role => userRoles.includes(role))))

        if (isAuthenticated) setComponent(isAuthenticated.element)
  }, [])


  return (
    
        <>
            {component}
        </>
  )
}
