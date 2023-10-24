import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_api_url } from '../shared';

export default function DeleteTweet(props) {

    const {tweet} = props

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // api isteği yap
    const delete_tweet = async () => {



        const request = await fetch(`${base_api_url}/tweets/${tweet._id}/delete`, {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token')
            },

    
        })

        const response = await request.json()

        console.log("TWEET DELETE:", response)

        if (request.status === 200) {

            // sayfayi yeniden yükle
            window.location.reload()
               
        } else {

            handleClose()
            alert ("Bir hata meydana geldi lütfen daha sonra tekrar dene.")
        }

    
    }


  return (
    <>
    <button className="ms-auto btn btn-link text-danger" onClick={handleShow}>
      Postu Sil
    </button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tweet Silinecek</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bu tweeti şu an silmek üzeresin bu işlem bir daha geri alınamaz.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          İptal
        </Button>
        <Button variant="danger" onClick={delete_tweet}>
          Silmeyi onaylıyorum
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
