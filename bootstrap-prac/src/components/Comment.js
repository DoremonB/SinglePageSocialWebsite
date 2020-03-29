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


class Timeline extends React.Component {
  constructor(props){
    super(props)
  }
 
  render() {
    return (
        <>
        
            <Row className="border border-primary m-2">
                <Col sm={3} >
                    <Row sm={9}>
                      <Col sm={10}>
                        <Image style={{height:'80px',width:'100%'}} src={nature} roundedCircle />
                        </Col>
                    </Row>

                    <Row sm={3}>
                      <Col sm={10}>
                        <small>{this.props.createdBy}</small>
                      </Col> 
                    </Row>
                    

                </Col>
                <Col sm={9} >
                    <div style={{overflow:"scroll",height:"100px"}}>
                        <h2>{this.props.content}</h2>
                    </div>
                </Col>
            
            </Row> 
        
                   
        </>
    
        
        


    
    ) 
  }
}

export default Timeline