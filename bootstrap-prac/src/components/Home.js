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
import jwt_decode from 'jwt-decode'
import nature from '../images/nature.jpeg'
import TimelineInsideProfile from './TimelineInsideProfile'
import MyTimelineInsideProfile from './MyTimelineInsideProfile'
import Friend from './Friend'
import MyFilteringComponent from './MyFilteringComponent'
import CreatePost from './CreatePost'
import ExploreNewFriends from './ExploreNewFriends'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      comment_content:'',
      show:false,
      showModal:false,
      ToastContent:'',

      first_name: '',
      email: '',
      ID:'',
      profile_pic:'',
      bio:'',

      currentTab:''

    }
    this.handleComment=this.handleComment.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
    this.showModalFun=this.showModalFun.bind(this)
    this.handleFollow=this.handleFollow.bind(this)
    

  }

  async componentDidMount() {
    
    if(!localStorage.usertoken){
      this.props.history.push(`/login`)
      return
    }
    const token = localStorage.usertoken
    
    const decoded = jwt_decode(token)
    console.log("decoded :"+decoded.first_name)
    console.log("decoded :"+decoded.email)
    console.log("decoded :"+decoded._id)
    this.setState({
      first_name: decoded.first_name,
      email: decoded.email,
      ID:decoded._id,
      profile_pic:decoded.profile_pic,
      bio:decoded.bio
      
    })
    
  }


  toggleShow(e){
    let x=e.target.value
    console.log("from child "+x)
    this.setState((prevState) => ({
      show: !prevState.show,
      ToastContent:x
    }));
    
  }
  handleFollow(e){
    console.log('clicked follow')
  }
  
  showModalFun(e){
    this.setState((prevState) => ({
      showModal: true
    }));
    console.log(this.state.show)
  }
  
  handleComment(e){
    
    this.setState({
      ToastContent:this.state.ToastContent,
      show:true
    })
  }

  renderTooltip(props) {
    
    return (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );
  }

  render() {
    const countries =
    [
        "Afghanistan",
        "Åland Islands",
        "Albania",
        "Algeria"
    ];

    return (
      <>
      {/* <MyFilteringComponent style={{position:'absolute'}} content={countries} /> */}
{/* {this.state.show && <div
  aria-live="polite"
  aria-atomic="true"
  style={{
    position:'fixed',
    width:'100%',
    height:'100px',
    backgroundColor:'transparent',
    // marginRight:'-25%',
    top:'0px',
    right:'0px',
    // left:'60%',
    zIndex:'1000'
  }}
>
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: '1rem',
    }}
  > 
<Alert dismissible variant="success" onClose={()=>{ this.setState({ show:false }) }}>
    You Added a Comment(Alert) !
    <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like.
</Alert>
</div>      
</div>} */}







{/* Toast         */}
<div
  aria-live="polite"
  aria-atomic="true"
  style={{
    position:'fixed',
    width:'100%',
    height:'100px',
    backgroundColor:'transparent',
    // marginRight:'-25%',
    bottom:'0px',
    right:'0px',
    // left:'60%',
    zIndex:'999'
  }}
>
  <div
    style={{
      position: 'absolute',
      
      top: 0,
      right: '1rem',
    }}
  > 
    <Toast  onClose={()=>{ this.setState({ show:false }) }} show={this.state.show} delay={3000} autohide>
      <Toast.Header>
        
        <strong className="mr-auto">Bootstrap</strong>
        <small>2 seconds ago</small>
      </Toast.Header>
  <Toast.Body>{this.state.ToastContent}</Toast.Body>
    </Toast>
  </div>
</div>
{/* Toast end */}     




{/* Modal  */}
<Modal show={this.state.showModal} onHide={()=>{this.setState({ showModal:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Status Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to upload the status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ showModal:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{this.setState({ showModal:false })}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
{/* Modal end */}








        <Container >
          
          <Row >
                <Col sm={12}>
                  <Image style={{height:'300px',width:'100%'}} src={nature} fluid thumbnail/>
                  <Image style={{height:'200px',width:'200px',position:'absolute',top:'230px',left:'30px',zIndex:'999'}} src={this.state.profile_pic} roundedCircle fluid thumbnail/>
                </Col>
                
          </Row>
          
          
          <Row className="mt-3">

            {/* left side */}
            

            <Col className="border border-primary" sm={3}>
            
              
              {/* row1 of left side */}
              <div style={{marginTop:"150px"}}>
              <Row  className="mt-2">
                <Col>
                  
                  <Card style={{ width: '100%',height:'auto' }}>
                    
                    {/* <Image style={{height:'auto',width:'100%'}} src={nature} roundedCircle fluid thumbnail/> */}
                    <Card.Body className="text-left">
  <Card.Title className="text-center">{this.state.email}</Card.Title>
                      <Card.Text>
                        {this.state.ID}
                      </Card.Text>
{/* <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={this.renderTooltip}
>                      
                      <Button onClick={this.handleFollow} variant="primary">Follow</Button>
</OverlayTrigger>                       */}
                    </Card.Body>
                  </Card>   
                </Col>
              </Row>
              </div>

              {/* Column2 of left side ...consists of 2x2 grid of photos*/}
              <Row>
                <Col>
                  <Container className="border border-primary mt-2">
                    {[1,2].map((num)=>{
                      return(
                        <Row>
                          <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profile_pic} fluid thumbnail/></Col>
                          <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profile_pic} fluid thumbnail/></Col> 
                        </Row>
                      )
                    })}
                    
                  </Container>                  
                   
                </Col>
              </Row>
                           
            </Col>


            {/* right side */}


            <Col className="border border-primary" sm={9}>

{/* Tab layout */}

<Tabs 
className="m-2"
style={{backgroundColor:"#c6b9c9"}} 
defaultActiveKey="Timeline" 
id="uncontrolled-tab-example"
unmountOnExit="true"
onSelect={(k)=>{ console.log("currentTab "+k); this.setState({currentTab:k})}}
>
  <Tab eventKey="Timeline" title="Timeline">
  <TimelineInsideProfile parent={this} />
  
  </Tab>
  <Tab eventKey="MyTimeline" title="MyTimeline">
  <MyTimelineInsideProfile TimelineType="MyTimeLine" parent={this} />

  </Tab>
  
  <Tab eventKey="Friends" title="Friends">
    {/* <Friend/> */}
    <ExploreNewFriends typeTab={this.state.currentTab} />
  </Tab>
  <Tab eventKey="ExploreNewFriends" title="ExploreNewFriends">
  <ExploreNewFriends typeTab={this.state.currentTab} />
  </Tab>

  <Tab eventKey="CreatePost" title="CreatePost">
    <CreatePost />
  </Tab>
  
</Tabs>    

{/* Tab layout end */}
            
            {/* <div className="p-5">

            
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


            </div> */}

            </Col>
          </Row>

        </Container>




      
      </>



    
    ) 
  }
}

export default Home