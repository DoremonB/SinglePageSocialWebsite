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
import axios from 'axios'

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

      currentTab:'',

      currentUser:null,
      profilePicArray:[],
      coverPicArray:[],

    }
    this.handleComment=this.handleComment.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
    this.showModalFun=this.showModalFun.bind(this)
    this.handleFollow=this.handleFollow.bind(this)

    this.profile_image_click=this.profile_image_click.bind(this)
    this.cover_image_click=this.cover_image_click.bind(this)
    
    this.handleSubmitProfileFile = this.handleSubmitProfileFile.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)

    this.handleSubmitCoverFile = this.handleSubmitCoverFile.bind(this)
    this.handleImagePreviewCover = this.handleImagePreviewCover.bind(this)
    

  }

  async componentDidMount() {

    const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    })
    // console.log('currentUser.data '+currentUser.data.user.profile_pic[currentUser.data.user.profile_pic.length-1])
    
    
    // if(!localStorage.usertoken){
    //   this.props.history.push(`/login`)
    //   return
    // }
    // const token = localStorage.usertoken
    
    // const decoded = jwt_decode(token)
    // console.log("decoded :"+decoded.first_name)
    // console.log("decoded :"+decoded.email)
    // console.log("decoded :"+decoded._id)
    this.setState({
      profilePicArray:currentUser.data.user.profile_pic,
      coverPicArray:currentUser.data.user.cover_pic,

      show_profile_pic_moodle:false,
      profile_image_file:'',

      show_cover_pic_moodle:false,
      cover_image_file:'',

      email: currentUser.data.user.email,
      ID:currentUser.data.user._id,
      profile_pic:currentUser.data.user.profile_pic[currentUser.data.user.profile_pic.length-1],
      cover_pic:currentUser.data.user.cover_pic[currentUser.data.user.cover_pic.length-1],
      bio:currentUser.data.user.bio,
      currentUser:currentUser.data.user
      
    })
    //this.state.currentUser.profile_pic
    
  }
  profile_image_click(e){
    this.setState({
      show_profile_pic_moodle:true
    })
  }
  cover_image_click(e){
    this.setState({
      show_cover_pic_moodle:true
    })
  }
  
  

  async handleSubmitProfileFile(){
    console.log('here clicked :')
    const data = new FormData() 
    data.append('image', this.state.profile_image_file)
    // data.append('caption',this.state.caption)
     
    for (var [key, value] of data.entries()) { 
      console.log(key, value);
    }
  
    await axios.post("http://localhost:5000/users/changeProfilePic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    }
        )
        .then(res => { // then print response status
          console.log(res.data.profile_image_url)
          
          this.setState({
            profile_pic:res.data.profile_image_url,
          })

        })

        const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
        {
          headers:{
            'authorization':'Bearer '+localStorage.usertoken,
            "Content-type": "multipart/form-data",
          }
        })
        
        this.setState({
          profilePicArray:currentUser.data.user.profile_pic,
          coverPicArray:currentUser.data.user.cover_pic,
    
          show_profile_pic_moodle:false,
          profile_image_file:'',
    
          show_cover_pic_moodle:false,
          cover_image_file:'',
    
          email: currentUser.data.user.email,
          ID:currentUser.data.user._id,
          profile_pic:currentUser.data.user.profile_pic[currentUser.data.user.profile_pic.length-1],
          cover_pic:currentUser.data.user.cover_pic[currentUser.data.user.cover_pic.length-1],
          bio:currentUser.data.user.bio,
          currentUser:currentUser.data.user
          
        })


            
  }
  async handleSubmitCoverFile(){
    console.log('here clicked :')
    const data = new FormData() 
    data.append('image', this.state.cover_image_file)
    // data.append('caption',this.state.caption)
     
    for (var [key, value] of data.entries()) { 
      console.log(key, value);
    }
  
    await axios.post("http://localhost:5000/users/changeCoverPic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    }
        )
        .then(res => { // then print response status
          console.log(res.data.cover_image_url)
          
          this.setState({
            cover_pic:res.data.cover_image_url,
          })

        })

    const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
        {
          headers:{
            'authorization':'Bearer '+localStorage.usertoken,
            "Content-type": "multipart/form-data",
          }
        })
        
        this.setState({
          profilePicArray:currentUser.data.user.profile_pic,
          coverPicArray:currentUser.data.user.cover_pic,
    
          show_profile_pic_moodle:false,
          profile_image_file:'',
    
          show_cover_pic_moodle:false,
          cover_image_file:'',
    
          email: currentUser.data.user.email,
          ID:currentUser.data.user._id,
          profile_pic:currentUser.data.user.profile_pic[currentUser.data.user.profile_pic.length-1],
          cover_pic:currentUser.data.user.cover_pic[currentUser.data.user.cover_pic.length-1],
          bio:currentUser.data.user.bio,
          currentUser:currentUser.data.user
          
        })


            
  }

  handleImagePreview = (e) => {
    
    let image_as_files = e.target.files[0];
    
    this.setState({
       profile_image_file: image_as_files,
    })
    
  }
  handleImagePreviewCover = (e) => {
    
    let image_as_files = e.target.files[0];
    
    this.setState({
       cover_image_file: image_as_files,
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

{/* Modal for profile pic */}
<Modal show={this.state.show_profile_pic_moodle} onHide={()=>{this.setState({ show_profile_pic_moodle:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Photo</Modal.Title>
        </Modal.Header>



        <Modal.Body>
          
          <Form className="text-left">
              <div class="custom-file">
                  <input onChange={this.handleImagePreview} type="file" class="custom-file-input" id="customFile" />
                  <label class="custom-file-label" for="customFile">Choose file</label>
              </div>               
          </Form>       
          
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={this.handleSubmitProfileFile} onHide={()=>{this.setState({ show_profile_pic_moodle:false })}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
{/* end Modal for profile pic */}

{/* Modal for cover pic */}
<Modal show={this.state.show_cover_pic_moodle} onHide={()=>{this.setState({ show_cover_pic_moodle:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Photo</Modal.Title>
        </Modal.Header>



        <Modal.Body>
          
          <Form className="text-left">
              <div class="custom-file">
                  <input onChange={this.handleImagePreviewCover} type="file" class="custom-file-input" id="customFile" />
                  <label class="custom-file-label" for="customFile">Choose file</label>
              </div>               
          </Form>       
          
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={this.handleSubmitCoverFile} onHide={()=>{this.setState({ show_cover_pic_moodle:false })}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
{/* end Modal for Cover pic */}


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
                  <Image onClick={this.cover_image_click} style={{height:'300px',width:'100%'}} src={this.state.cover_pic} fluid thumbnail/>
                  <Image onClick={this.profile_image_click} style={{height:'200px',width:'200px',position:'absolute',top:'230px',left:'30px',zIndex:'999'}} src={this.state.profile_pic} roundedCircle fluid thumbnail/>
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
                    {this.state.profilePicArray.map((p,index)=>{
                      console.log("indexx"+index)
                      if(index%2 ==0){
                        return(
                          <Row>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profilePicArray[index]} fluid thumbnail/></Col>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profilePicArray[index+1]} fluid thumbnail/></Col> 
                          </Row>
                        )
                      }
                      
                    })}
{/* 
                    {
                      this.state.profilePicArray.forEach((p,index)=>{
                        console.log(p+" indexx "+index)
                        return(
                          <Row>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={p} fluid thumbnail/></Col>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={p} fluid thumbnail/></Col> 
                          </Row>
                        )
                        index=index+1
                      })
                    } */}
                    
                  </Container>
                  <Container className="border border-primary mt-2">
                    {this.state.coverPicArray.map((p,index)=>{
                      console.log("indexx"+index)
                      if(index%2 ==0){
                        return(
                          <Row>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.coverPicArray[index]} fluid thumbnail/></Col>
                            <Col onClick={()=>{ this.setState({ showModal:true }) }} sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.coverPicArray[index+1]} fluid thumbnail/></Col> 
                          </Row>
                        )
                      }
                      
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