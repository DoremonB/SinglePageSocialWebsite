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
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    

  }
  
  async handleSubmit(e){
    console.log(this.state.username +"  "+this.state.password)
    const response=await axios
    .post('http://localhost:5000/users/login',{
      email:this.state.username,
      password:this.state.password
    })

    console.log(response.data.token)
    localStorage.setItem('usertoken',response.data.token)
    
    this.props.history.push(`/home`)
  }
  
  
  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
    console.log(this.state.username +"  "+this.state.password)
  }

  render() {
    
    return (
      <>


<Form onSubmit={this.handleSubmit} style={{width:"60%"}} className="container text-left mt-2">

<Form.Group >
    <Form.Label className="text-left">Username</Form.Label>
    <Form.Control name="username" onChange={this.handleChange} type="text" placeholder="Enter username" />
    <Form.Text className="text-muted">
      Username should be unique:)
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

export default Login