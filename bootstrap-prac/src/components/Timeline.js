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
    this.state={
      comment_content:'',
      show:false
    }
    this.handleComment=this.handleComment.bind(this)

  }
  handleComment(e){
    this.setState({
      comment_content:e.target.value,
      show:true
    })
    console.log(e.target.value)

  }
  render() {
    return (
      <>
{this.state.show && 
<div
style={{
  position:'fixed',
  top:0,
  width:'100%'
}}
>
<Alert dismissible variant="success" onClose={()=>{ this.setState({ show:false }) }}>
    You Added a Comment !
    <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like.
</Alert>
</div>      
}
    
        <Container >
          
          
          <Row>

            {/* left side */}

            <Col className="border border-primary" sm={3}>
              
              {/* row1 of left side */}
              <Row className="mt-2">
                <Col>
                  
                  <Card style={{ width: '100%',height:'auto' }}>
                    
                    <Image style={{height:'auto',width:'100%'}} src={nature} fluid thumbnail/>
                    <Card.Body className="text-left">
                      <Card.Title className="text-center">My Username</Card.Title>
                      <Card.Text>
                        Bio Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                      <Button variant="primary">Follow</Button>
                    </Card.Body>
                  </Card>   
                </Col>
              </Row>

              {/* Column2 of left side ...consists of 2x2 grid of photos*/}
              <Row>
                <Col>
                  <Container className="border border-primary mt-2">
                    {[1,2].map((num)=>{
                      return(
                        <Row>
                          <Col sm={6}><Image style={{height:'auto',width:'100%'}} src={nature} fluid thumbnail/></Col>
                          <Col sm={6}><Image style={{height:'auto',width:'100%'}} src={nature} fluid thumbnail/></Col> 
                        </Row>
                      )
                    })}
                    
                  </Container>                  
                   
                </Col>
              </Row>
                           
            </Col>


            {/* right side */}


            <Col className="border border-primary" sm={9}>

              
            
            <div className="p-5">

            
              {[1,2,3].map(num=>{

              
              return (
<div>                
              <Card className="mb-2 p-3 text-left"  style={{ width: '100%',height:'auto' }}>
                <Card.Img variant="top" src={nature} />
                <Card.Body>
                  <Card.Title>This will be some caption</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
              <Button  variant="primary">Likes <Badge variant="light">{num*num}</Badge></Button>
              <Button className="ml-1" variant="primary">Comments <Badge variant="light">{num+1}</Badge></Button>
                </Card.Body>
<Accordion>
<Card>
  <Card.Header>
    <Accordion.Toggle as={Button} variant="link" eventKey="0">
      Show all comments
    </Accordion.Toggle>
  </Card.Header>
  <Accordion.Collapse eventKey="0">
      <>
      <h2>comment number c</h2>
      <h2>comment number c</h2>
      <h2>comment number c</h2>
      <div>
          <InputGroup className="mb-3 p-3">
              <FormControl
                onChange={this.handleComment}
                placeholder="Add Comment"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button  variant="outline-info">Comment</Button>
              </InputGroup.Append>
          </InputGroup>        
      </div>
      </>
  </Accordion.Collapse>
</Card>
</Accordion>                
              </Card>



</div>
              )

              })}


            </div>

            </Col>
          </Row>

        </Container>




      
      </>



    
    ) 
  }
}

export default Timeline