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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const make_api_request = async () => {

    const request = await fetch(`${base_api_url}/users/${user._id}/roles/promote`, {

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

   console.log("ROLE API:", response)
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

            <Form.Select onChange={(e) => setRole(e.target.value)}>

                <option>Rank Seçin</option>

                <option value="Admin">Admin</option>
                <option value="User">User</option>

            </Form.Select>


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