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
import './Home.css'

import { currentUserFun,changeProfilePicFun,changeCoverPicFun } from '../functions/funtions'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      comment_content:'',
      show:false,
      showModal:false,
      showModalUpdate:false,
      ToastContent:'',

      first_name: '',
      last_name:'',
      email: '',
      ID:'',
      profile_pic:'',
      bio:'',

      currentTab:'',

      currentUser:null,
      profilePicArray:[],
      coverPicArray:[],

      status:'',

      temp_first_name: '',
      temp_last_name:'',
      temp_bio:'',
      

    }
    this.handleComment=this.handleComment.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
    this.showModalFun=this.showModalFun.bind(this)
    

    this.profile_image_click=this.profile_image_click.bind(this)
    this.cover_image_click=this.cover_image_click.bind(this)
    
    this.handleSubmitProfileFile = this.handleSubmitProfileFile.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)

    this.handleSubmitCoverFile = this.handleSubmitCoverFile.bind(this)
    this.handleImagePreviewCover = this.handleImagePreviewCover.bind(this)
    this.handleCreateStatusPost=this.handleCreateStatusPost.bind(this)
    this.onStatusChnage=this.onStatusChnage.bind(this)
    this.handleChange=this.handleChange.bind(this)
    

  }
//done
  async componentDidMount() {

    // const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
    // {
    //   headers:{
    //     'authorization':'Bearer '+localStorage.usertoken,
    //     "Content-type": "multipart/form-data",
    //   }
    // })

    const currentUser=await currentUserFun()





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
      first_name:currentUser.data.user.first_name,
      last_name:currentUser.data.user.last_name,
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
  
  
//Done
  async handleSubmitProfileFile(){
    
    const data = new FormData() 
    data.append('image', this.state.profile_image_file)
    
     
    for (var [key, value] of data.entries()) { 
      console.log(key, value);
    }
  
    // const res=await axios.post("http://localhost:5000/users/changeProfilePic", data, 
    // {
    //   headers: {
    //       "Authorization": "Bearer "+localStorage.usertoken,
    //       "Content-type": "multipart/form-data",
    //   },                    
    // })

    const res=await changeProfilePicFun(data)

    

        // .then(res => { // then print response status
          console.log(res.data.profile_image_url)
          
          this.setState({
            profile_pic:res.data.profile_image_url,
          })

        // })

        // const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
        // {
        //   headers:{
        //     'authorization':'Bearer '+localStorage.usertoken,
        //     "Content-type": "multipart/form-data",
        //   }
        // })

        const currentUser=await currentUserFun()
        
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
  
    // const res=await axios.post("http://localhost:5000/users/changeCoverPic", data, 
    // {
    //   headers: {
    //       "Authorization": "Bearer "+localStorage.usertoken,
    //       "Content-type": "multipart/form-data",
    //   },                    
    // })

    const res=await changeCoverPicFun(data)

        // .then(res => { // then print response status
          console.log(res.data.cover_image_url)
          
          this.setState({
            cover_pic:res.data.cover_image_url,
          })

        // })

    // const currentUser=await axios.post('http://localhost:5000/users/currentUser',{},
    //     {
    //       headers:{
    //         'authorization':'Bearer '+localStorage.usertoken,
    //         "Content-type": "multipart/form-data",
    //       }
    //     })

    const currentUser=await currentUserFun()
        
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
  
  
  showModalFun(e){
    this.setState((prevState) => ({
      showModal: true
    }));
    console.log(this.state.show)
  }
  ///status------
  async handleCreateStatusPost(e){
    
    const result=await axios.post('http://localhost:5000/users/createStatusPost',{
      content:this.state.status
    },{
      "headers":{
        'authorization':'Bearer '+localStorage.usertoken
      }
    })
    console.log('statuspost : '+result.data.status)
    
    //Component did mound copy paste
    const currentUser=await currentUserFun()
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
  onStatusChnage(e){
    this.setState({
      status:e.target.value
      
    })
    console.log(this.state.status)
  }

  handleChange(e){
    console.log(e.target.name +"  "+ e.target.value)
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  ///


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


{/* Modal for status */}
<Modal show={this.state.showModal} onHide={()=>{this.setState({ showModal:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Status Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to upload the status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ showModal:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCreateStatusPost}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
{/* Modal end */}


{/* Modal for update profile */}

<Modal dialogClassName="my-modal" show={this.state.showModalUpdate} onHide={()=>{this.setState({ showModalUpdate:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
         
<div class="form-group">
    <label for="exampleInputPassword1">First Name</label>
    <input type="text" onChange={this.handleChange} name="temp_first_name" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Last Name</label>
    <input type="text" onChange={this.handleChange} name="temp_last_name"  class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Bio</label>
    <input type="text" onChange={this.handleChange} name="temp_bio" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>             
              
              
            
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ showModalUpdate:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
            
            
            const data={
              
                first_name:this.state.temp_first_name,
                last_name:this.state.temp_last_name,
                bio:this.state.temp_bio
              
            }
            console.log("data : "+data.first_name)
            console.log("data : "+data.last_name)
            console.log("data : "+data.bio)
          
          const result=await axios.post('http://localhost:5000/users/updateProfile',data,
          {
            headers:{
              'authorization':'Bearer '+localStorage.usertoken,
              
            }
          }
          )
          console.log('result.data.user.status'+result.data.status)
          console.log('result.data.user.first_name'+result.data.user.first_name)
          console.log('result.data.user.last_name'+result.data.user.last_name)
          console.log('result.data.user.bio'+result.data.user.bio)
          if(result.data.status=='success'){
            this.setState({
              first_name:result.data.user.first_name,
              last_name:result.data.user.last_name,
              bio:result.data.user.bio,
              
            })
          }
          

          }}>
            Save
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
                    <Card.Body className="text-center">
  <Card.Title style={{ backgroundColor:"#d3d3d3" }} className="text-center">{this.state.first_name} {this.state.last_name}</Card.Title>
                      <Card.Text style={{ backgroundColor:"#d3d3d3" }}>
                        {this.state.bio}
                      </Card.Text>
                            <button type="button" onClick={()=>{console.log("this.state.showModalUpdate"+this.state.showModalUpdate); this.setState({ showModalUpdate:true }) }} class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
                              Update Profile
                            </button>                      
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
                  <Container style={{maxHeight:"250px",overflowY:'scroll',padding:"5px"}} className="border border-primary mt-2">
                  <h2>Profile Pics</h2>
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
                  <Container style={{maxHeight:"250px",overflowY:'scroll',padding:"5px"}} className="border border-primary mt-2">
                    <h2>Cover Pics</h2>
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
  <TimelineInsideProfile name="Timeline" onStatusChnage={this.onStatusChnage} parent={this} />
  
  </Tab>
  <Tab eventKey="MyTimeline" title="MyTimeline">
  {/* <MyTimelineInsideProfile name="MyTimeline" onStatusChnage={this.onStatusChnage} TimelineType="MyTimeLine" parent={this} /> */}
  <TimelineInsideProfile name="MyTimeline" onStatusChnage={this.onStatusChnage} parent={this} />

  </Tab>
  
  <Tab eventKey="Friends" title="Friends">
    {/* <Friend/> */}
    <ExploreNewFriends name="Friends" typeTab={this.state.currentTab} />
  </Tab>
  <Tab eventKey="ExploreNewFriends" title="ExploreNewFriends">
  <ExploreNewFriends name="ExploreNewFriends" typeTab={this.state.currentTab} />
  </Tab>

  <Tab eventKey="CreatePost" title="CreatePost">
    <CreatePost />
  </Tab>
  
</Tabs>    

{/* Tab layout end */}
            
            

            </Col>
          </Row>

        </Container>




      
      </>



    
    ) 
  }
}

export default Home