import Dropdown from 'react-bootstrap/Dropdown';
import { base_api_url } from '../shared';





function ModerationTool(props) {

  const {tweetId, commentId} = props

  // utils
  // @YORUM SILME
  const delete_comment = async (event) => {

    // a linkine verilen değerleri unuttur
    event.preventDefault()
    const confirm = window.confirm("Bu yorumu silmeyi onaylıyor musunuz?")

    if (confirm) {

        const request = await fetch(`${base_api_url}/tweets/${tweetId}/comments/${commentId}/delete/comment`, {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token')
            }

        })

        const response = await request.json()

        if (request.status === 200) {

            window.location.reload()
        } else {

            console.error(response)
            alert("Bir hata var")
        }
    
    }


    }


  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
      
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className='text-danger' onClick={delete_comment}>Yorumu Sil</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Yorumu Düzenle</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Yorumu Şikayet Et</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ModerationTool;