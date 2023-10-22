import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_api_url } from '../shared';





function CreateTweetModal(props) {

  // user instance
  const {user} = props
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("")
  const [file, setFile] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // api istek

  const create_tweet = async () => {

    const uploadedFile = new FormData()
    // key/value olacak şekilde gir
    uploadedFile.append("content", input)
    // resimleride gönder
    uploadedFile.append("attachment", file)

    const request = await fetch(`${base_api_url}/tweets/create`, {

        method: "POST",
        headers: {
  
            "Authorization": "Bearer " + localStorage.getItem('access_token')
        },

        body: uploadedFile

    })

    const response = await request.json()

    console.log("SVDEN GELEN TWEET VERİ:", response)

    // modali kapat
    handleClose()

    if (request.status === 200)   
        window.location.reload()

}



  return (
    <>
      <Button className='ms-auto btn btn-success' onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tweet Oluştur</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

            <textarea 
            className='form-control' 
            placeholder={`@${user.username} insanlar ile düşüncelerini paylaş.`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            > </textarea>

            <div className="mt-3">

                <input className='form-control' type="file" 
                onChange={e => setFile(e.target.files[0])}
                />

            </div>

        </Modal.Body>
        
        <Modal.Footer>

          <Button variant="link" onClick={create_tweet}>
            Tweetle
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTweetModal;