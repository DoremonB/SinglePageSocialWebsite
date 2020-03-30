import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import AlertComponent from './AlertComponent'
import AccordionComponent from './AccordionComponent'
import BadgeComponent from './BadgeComponent'
import BreadcrumbComponent from './BreadcrumbComponent'
import ButtonComponent from './ButtonComponent'
import ButtonGroupComponent from './ButtonGroupComponent'
import CardComponent from './CardComponent'

import nature from '../images/nature.jpeg'


class NotifcationItem extends React.Component {
  constructor(props){
    super(props)
  }
 
  render() {
    return (
        <>
        
            <Row className="border border-primary m-2" style={{display: 'flex',alignItems: 'center'}}>
                <Col sm={2} >
                    <Row sm={9}>
                      <Col sm={10}>
                        <Image style={{height:'auto',width:'100%'}} src={nature} roundedCircle />
                        </Col>
                    </Row>

                    <Row sm={3}>
                      <Col sm={10}>
                        <small>Username</small>
                      </Col> 
                    </Row>
                    

                </Col>
                <Col sm={8} >
                    <div style={{overflow:"scroll",height:"100px"}}>
                        <p>{this.props.notif.content}</p>
                    </div>
                </Col>
                <Col  sm={2} >
                    <div>
                    
                    <Button id={this.props.notif._id} onClick={this.props.deleteNotif} style={{verticalAlign:'middle'}} variant="danger">
                        X
                    </Button>
                    </div>
                </Col>
            
            </Row> 
        
                   
        </>
    
        
        


    
    ) 
  }
}

export default NotifcationItem