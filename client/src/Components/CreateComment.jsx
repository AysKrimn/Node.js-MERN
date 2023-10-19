import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_api_url } from '../shared';





function CreateComment(props) {

  // user instance
  const {tweet} = props

  const [show, setShow] = useState(false);
  const [input, setInput] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // api istek

  const create_tweet = async () => {

    const request = await fetch(`${base_api_url}/tweets/${tweet._id}/make/comment`, {

        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token')
        },

        body: JSON.stringify({ message: input })

    })

    const response = await request.json()

    console.log("SVDEN GELEN TWEET VERİ:", response)

    // modali kapat
    handleClose()

    if (request.status === 200)   
        window.location.href = `/tweets/${tweet._id}`

}



  return (
    <>
      <Button className='ms-auto btn btn-success' onClick={handleShow}>
        Yorum Yap
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
     
        </Modal.Header>
        
        <Modal.Body>


            <div className='p-2'>
            <p>
                @{tweet.author.username} şöyle dedi:
            </p>

            <p>{tweet.content}</p>

            </div>

            <textarea 
            className='form-control' 
            placeholder={`@${tweet.author.username}'in gönderisine yorum yapıyorsun.`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            
            > </textarea>

        </Modal.Body>
        
        <Modal.Footer>

          <Button variant="link" onClick={create_tweet}>
            Yorum Yap
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateComment;