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
import { myNotificationsFun,deleteNotifFun } from '../functions/funtions';

class Notifications extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      comment_content:'',
      show:true,
      myNotifications:[],
      Loading:true
    }
    this.deleteNotif=this.deleteNotif.bind(this)
   
  }
  async componentDidMount(){
    // const myNotifications= await axios.post('http://localhost:5000/users/myNotifications',{},
    // {
    //   headers:{
    //     'authorization':'Bearer '+localStorage.usertoken
    //   }
    // })

    const myNotifications=await myNotificationsFun() 

    console.log(myNotifications)
    this.setState({
      myNotifications:myNotifications.data,
      Loading:false
    })
    
  }

  async deleteNotif(e){
    const id=e.target.id
    console.log(id)

    this.setState({ Loading:true })
    await deleteNotifFun({notifId:id}) 
    
    // await axios.post('http://localhost:5000/users/deleteNotif',{
    //   notifId:id
    // },
    // {
    //   headers:{
    //     'authorization':'Bearer '+localStorage.usertoken
    //   }
    // })
    
    /////Component did mount
    const myNotifications=await myNotificationsFun() 

    console.log(myNotifications)
    this.setState({
      myNotifications:myNotifications.data,
      Loading:false
    })
  }
  
  render() {
    if(this.state.Loading){
      return(
          <div class="loader"></div>
      )
    }
    return (
      
       
            


      <div>
    <Modal show={this.state.show} onHide={()=>{this.props.history.push(`/home`)}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        {this.state.myNotifications.map((n)=>{
          return (
            <>
              <NotificationItem deleteNotif={this.deleteNotif} notif={n} />
            </>
            
          )
        })}


        </Modal.Body>
        
      </Modal>          
        
      </div>
      




    
    ) 
  }
}

export default Notifications