import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthProvider } from '../Context/UserContext';
import { useContext } from 'react';



function Navbar() {

  const { user } = useContext(AuthProvider)
  console.log("NAVDAKİ USER:", user)

  return (

    // nav.item = div
    <Nav as="nav" className='sitenav' defaultActiveKey="/home">
    <Nav.Item>
      <NavLink to="/">Dashboard</NavLink>
    </Nav.Item>

    <Nav.Item>
      <NavLink  to="/not">Test</NavLink>
    </Nav.Item>

   

    {
        user === null 
        ?
        <NavLink className="ms-auto ic-bosluk" to="/login">
                Giriş Yap
        </NavLink> 

        :
            <Dropdown className='ms-auto ic-bosluk'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                 {user.username}
                </Dropdown.Toggle>
          
                <Dropdown.Menu>

                  <Dropdown.Item>
                        <Link className='text-danger' to="?">Çıkış Yap</Link>
                  </Dropdown.Item>
                 
                </Dropdown.Menu>

            </Dropdown>

    }


  </Nav>
  );
}

export default Navbar;