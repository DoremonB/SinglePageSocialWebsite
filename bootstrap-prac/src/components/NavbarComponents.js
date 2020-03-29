import React from 'react';
import ReactDOM from 'react-dom';
import { Nav,Navbar,Card,Button,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import AlertComponent from './AlertComponent'
import AccordionComponent from './AccordionComponent'
import BadgeComponent from './BadgeComponent'
import BreadcrumbComponent from './BreadcrumbComponent'
import ButtonComponent from './ButtonComponent'
import ButtonGroupComponent from './ButtonGroupComponent'
import CardComponent from './CardComponent'

import nature from '../images/nature.jpeg'
import TimelineInsideProfile from './TimelineInsideProfile'
import Friend from './Friend'
import MyFilteringComponent from './MyFilteringComponent'

class NavbarComponent extends React.Component {
  
  render() {
  

    return (
      <>


<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/home">Home</Nav.Link>
      
    </Nav>

    <Nav className="ml-auto">
      <Nav.Link href="/notifications">Notifications</Nav.Link>
      <Nav.Link href="/Logout">Logout</Nav.Link>
    </Nav>
    
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>


      
      </>



    
    ) 
  }
}

export default NavbarComponent