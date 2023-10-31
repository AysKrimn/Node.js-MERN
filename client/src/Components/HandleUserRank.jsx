import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// select menu
import Form from 'react-bootstrap/Form';
import { base_api_url } from '../shared';


function HandleUserRank(props) {

    
  const { user } = props

  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const [action, setAction] = useState("")
  const [error, setError] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const make_api_request = async () => {

    // 2 durum var Promote (Rütbe atlama) demote (rütbe düşürme)
    let path = "promote"

    if (action === "Demote") 
       path = "demote"
      
    let endpoint = `${base_api_url}/users/${user._id}/roles/${path}`

    const request = await fetch(`${endpoint}`, {

        method: "POST",
        headers: {
  
            "Authorization": "Bearer " + localStorage.getItem('access_token'),
            "Content-type": "application/json"
        },

        body: JSON.stringify({

            role: role
        })

    })

   const response = await request.json()

   if (request.status !== 201) {

      // hatayı etle
      setError(response.message)
   } else if (request.status === 201) {

      // reload at
      window.location.reload()
   }

   console.log("ROLE API:", response)
  }



  // roller
  const availableRoles = [

      {
          name: "Admin",
      },

      {
         name: "User",
      }
  ]
  // tool
  // getter Promote veya Demote olabilir
  const showTool = () => {

    // eğer action boşsa çalışma
    if (!action.length) return;


    let displayMessage = "Kullanıcının rütbesini yükseltirsiniz."
    // rütbe yükseltiliyosa
    if (action === "Demote")
        displayMessage = "Kullanıcının rütbesini düşürürsünüz."

    return (

        <>
        <p className='ps-2 text-danger'>{error}</p>

        <Form.Select defaultValue="defaultRank" className='mt-3' 
        onChange={(e) =>  { setError(""); setRole(e.target.value)  } }>

          <option value="defaultRank" disabled>Rütbe Seçin</option>
          {availableRoles.map((role, index) => {

              return <option key={index} value={role.name} >{role.name}</option>
          })}


        </Form.Select>

        <p className='ps-2 mt-2 text-muted'>{displayMessage}</p>

        </>
    )

  }

  return (
    <>
      <Button className='ms-auto' variant="link" onClick={handleShow}>
        Düzenle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

            <Form.Select defaultValue="default" onChange={(e) => setAction(e.target.value)}>

                <option value="default" disabled>Eylem Seçiniz</option>

                <option value="Promote">Rank Ekle</option>
                <option value="Demote">Rank Düşür</option>

            </Form.Select>

            {/* show tool aşaması */}
            {showTool()}
       
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="success" onClick={make_api_request}>
            Onayla
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HandleUserRank;