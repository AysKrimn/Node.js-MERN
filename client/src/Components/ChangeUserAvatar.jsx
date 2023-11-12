import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { base_api_url } from '../shared';
import { updateToken } from '../Utils/UpdateToken';


export default function ChangeUserAvatar(props) {

    const { userId, sessionId } = props
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // api isteği
    const make_api_request = async (event) => {

        // sayfanın yenilenmesini durdur
        console.log("URİ:", event.target.action)
        event.preventDefault()

        const uploadedFile = new FormData()
        // resimleride gönder
        uploadedFile.append("avatar", file)
        uploadedFile.append("user_id", userId)

        const request = await fetch(event.target.action, {

            method: "POST",
            headers: {
    
                "Authorization": "Bearer " + localStorage.getItem('access_token')
            },

            body: uploadedFile

        })


        const response = await request.json()

        if (request.status === 201) {


            if (sessionId === userId) updateToken(response.data)
            window.location.reload()
        } else {

            alert(response.message)
        }
        
        console.log("AVATAR PP ENDPONT:", response)

    }
  
    return (
      <>


        <button className='btn btn-link' onClick={handleShow}>
            Avatarı Değiştir
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Avatar Değiştir</Modal.Title>
          </Modal.Header>


          <Modal.Body>

            <form action={`${base_api_url}/user/set/avatar`} onSubmit={make_api_request}>

                <div className='mb-3'>

                        <input type="file" className='form-control' 
                         onChange={(e) => setFile(e.target.files[0])}
                        />
                </div>

         
         
          <Modal.Footer>
    
            <Button type='submit' variant="success">
              Onayla
            </Button>

          </Modal.Footer>


          </form>
          </Modal.Body>
        
        </Modal>
      </>
    );


}
