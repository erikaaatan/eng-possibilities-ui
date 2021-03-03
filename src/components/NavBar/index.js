import React from "react";
import './NavBar.scss';
import { Navbar, Nav } from "react-bootstrap";

const NavBar = (props) => {
  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand href="#">DePo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <div className='custom-control custom-switch auto-update'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customSwitches'
              // checked={this.props.autoUpdateDefaultStatus}
              onChange={props.handleToggle} 
            />
            <label className='custom-control-label' htmlFor='customSwitches'>
              Automatically Update Graph
            </label>
          </div>
      </Navbar>
    </>
  );
};

export default NavBar;
