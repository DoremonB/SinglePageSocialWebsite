import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Modal,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import AlertComponent from './AlertComponent'
import AccordionComponent from './AccordionComponent'
import BadgeComponent from './BadgeComponent'
import BreadcrumbComponent from './BreadcrumbComponent'
import ButtonComponent from './ButtonComponent'
import ButtonGroupComponent from './ButtonGroupComponent'
import CardComponent from './CardComponent'
import Comment from './Comment'
import MyFilteringComponent from './MyFilteringComponent'
import nature from '../images/nature.jpeg'

import NotificationItem from './NotifcationItem'
import axios from 'axios';

class Notifications extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      comment_content:'',
      show:true,
      myNotifications:[]
    }
   
  }
  async componentDidMount(){
    const myNotifications= await axios.post('http://localhost:5000/users/myNotifications',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken
      }
    })
    console.log(myNotifications)
    this.setState({
      myNotifications:myNotifications.data
    })
  }
  
  render() {
    return (
      
       
            


      <div>
    <Modal show={this.state.show} onHide={()=>{this.setState({ show:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        {this.state.myNotifications.map((n)=>{
          return (
            <>
              <NotificationItem notif={n} />
            </>
            
          )
        })}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ show:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{this.setState({ show:false })}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>          
        
      </div>
      




    
    ) 
  }
}

export default Notifications