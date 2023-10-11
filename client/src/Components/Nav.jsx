import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (

    // nav.item = div
    <Nav as="nav" className='sitenav' defaultActiveKey="/home">
    <Nav.Item>
      <NavLink to="/">Dashboard</NavLink>
    </Nav.Item>

    <Nav.Item>
      <NavLink  to="/not">Test</NavLink>
    </Nav.Item>

    <NavLink className="ms-auto ic-bosluk" to="/login">
        Giriş Yap
    </NavLink>

  </Nav>
  );
}

export default Navbar;