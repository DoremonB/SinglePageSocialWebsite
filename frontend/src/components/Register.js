import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
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
import axios from 'axios'

import { register } from '../functions/funtions' 

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state={
      firstname:'',
      lastname:'',
      password:'',
      confirm_password:'',
      email:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    

  }
  
  async handleSubmit(e){
    
    
    // const response=await axios
    // .post('http://localhost:5000/users/register',{
    //   first_name:this.state.username,
    //   last_name:this.state.username,
    //   email:this.state.email,
    //   password:this.state.password
    // })

    let data={
      first_name:this.state.firstname,
      last_name:this.state.lastname,
      email:this.state.email,
      password:this.state.password
    }
    const response=await register(data)
    
    this.props.history.push(`/login`)
    

    // console.log(response)


    // this.props.history.push(`/login`)
  }
  
  
  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
    console.log(this.state.firstname +"  "+this.state.email +"  "+this.state.password +"  "+this.state.confirm_password)
  }

  render() {
    
    return (
      <>


<Form onSubmit={this.handleSubmit} style={{width:"60%"}} className="container text-left mt-2">

<Form.Group >
    <Form.Label className="text-left">First Name</Form.Label>
    <Form.Control name="firstname" onChange={this.handleChange} type="text" placeholder="Enter username" />
    
  </Form.Group>

  <Form.Group >
    <Form.Label className="text-left">Last Name</Form.Label>
    <Form.Control name="lastname" onChange={this.handleChange} type="text" placeholder="Enter username" />
    
  </Form.Group>

  <Form.Group  controlId="formBasicEmail">
    <Form.Label className="text-left">Email</Form.Label>
    <Form.Control name="email" onChange={this.handleChange} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" onChange={this.handleChange} type="password" placeholder="Password" />
  </Form.Group>
  

  

  <Button onClick={this.handleSubmit} variant="primary">
    Submit
  </Button>
</Form>      
      </>






    
    ) 
  }
}

export default Register