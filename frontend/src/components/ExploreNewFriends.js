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
import MyFilteringComponent from './MyFilteringComponent'
import nature from '../images/nature.jpeg'
import axios from 'axios'
import { allusersFun, allusersmyfriendsFun,addFriendFun,removeFriendFun } from '../functions/funtions'

class ExploreNewFriend extends React.Component {
  constructor(props){
    super(props)
    this.state={
        myDisplayList:[],
        myCompleteList:[],
        myfriends:[],
        Loading:true,
    }
    this.handleAdd=this.handleAdd.bind(this)
    this.handleRemove=this.handleRemove.bind(this)
  }

  async componentDidMount() {
    console.log("inside didmount explorenewfirends")
  //   const allusers=await axios.post('http://localhost:5000/users/allusers',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

  const allusers=await allusersFun()

  // const myfriends=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

  const myfriends=await allusersmyfriendsFun()

    console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:allusers.data,
        myDisplayList:allusers.data,
        myfriends:myfriends.data,
        Loading:false
    })
    
  }
  async handleAdd(e){

    for(var i=0;i<this.state.myfriends.length;i++){
      console.log("#myfrinds :"+this.state.myfriends[i]._id)
    }
    for(var i=0;i<this.state.myCompleteList.length;i++){
      console.log("#myCompleteList :"+this.state.myCompleteList[i]._id)
    }
    let x=e.target.id 
    const bodyParameters = {
      friendThisUserId: x
    };
    

    // const response=await axios.post('http://localhost:5000/users/addFriend',bodyParameters,
    // {
    //   headers:{
    //     'authorization':'Bearer '+localStorage.usertoken,
    //     'Content-Type': 'application/json',
    //   }
    // }
    // )
    const response=await addFriendFun(bodyParameters)
    console.log(response.data)

    //Now we need to set new data so copy pasing compinent didmount code here
  //   const allusers=await axios.post('http://localhost:5000/users/allusers',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

    this.setState({ Loading:true })
  const allusers=await allusersFun()

  // const myfriends=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

  const myfriends=await allusersmyfriendsFun()

    console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:allusers.data,
        myDisplayList:allusers.data,
        myfriends:myfriends.data,
        Loading:false
    })


  }


  async handleRemove(e){
    let x=e.target.id 
    const bodyParameters = {
      friendThisUserId: x
    };
    

    // const response=await axios.post('http://localhost:5000/users/removeFriend',bodyParameters,
    // {
    //   headers:{
    //     'authorization':'Bearer '+localStorage.usertoken,
    //     'Content-Type': 'application/json',
    //   }
    // }
    // )
    this.setState({ Loading:true })
    const response=await removeFriendFun(bodyParameters)
    console.log(response.data)

  //   const allusers=await axios.post('http://localhost:5000/users/allusers',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })
  const allusers=await allusersFun()

  // const myfriends=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })
  const myfriends=await allusersmyfriendsFun()

    console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:allusers.data,
        myDisplayList:allusers.data,
        myfriends:myfriends.data,
        Loading:false
    })


  }

  filterList = (event) => {
    this.setState({ Loading:true })
    let myDisplayList = this.state.myCompleteList.filter((item) => {
      if(item.email.toLowerCase().search(event.target.value.toLowerCase()) !== -1){
        console.log('filterhere :'+item.email)
        return item
      }
        
    });
      // if(event.target.value==""){
      //     this.setState({myDisplayList: []});
      // }
      // else{
          this.setState({myDisplayList: myDisplayList,Loading:false});
      // }
    
  }
 
  render() {
    if(this.state.Loading){
      return(
          <div class="loader"></div>
      )
    }
    
    if(this.props.typeTab=="ExploreNewFriends"){
      return (
        <>
        

                <InputGroup style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                    <FormControl
                    
                    onChange={this.filterList}
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    
                    />
                
                </InputGroup>  
        
        {this.state.myDisplayList.map(n=>{
          console.log("myDisplayList ::" +n._id)
            return <Row style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                <Col sm={2} >
                    <Image style={{height:'auto',width:'100%',margin:'0.5rem'}} src={n.profile_pic[n.profile_pic.length-1]} roundedCircle />
                </Col>
                <Col sm={8} >
                    <Card style={{margin:'0.5rem',textAlign:'left'}}>
                        <Card.Body>{n.email}</Card.Body>
                    </Card>
                </Col>
                <Col sm={2}>
                    
                    {this.state.myfriends.some(f=>f._id ===n._id)==1? <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>:<Button onClick={this.handleAdd} id={n._id} className="text-center" variant="primary">Add Friend</Button>}
                    
                </Col>
                
            </Row>      
        })}  
        </>
    
    )
    }





    else{
      return (
        <>
        

                <InputGroup style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                    <FormControl
                    
                    onChange={this.filterList}
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    
                    />
                
                </InputGroup>  
        
        {this.state.myDisplayList.map(n=>{
          console.log("myDisplayList ::" +n._id)
          if(this.state.myfriends.some(f=>f._id ===n._id)==1){
            return <Row style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                <Col sm={2} >
                    <Image style={{height:'auto',width:'100%',margin:'0.5rem'}} src={n.profile_pic[n.profile_pic.length-1]} roundedCircle />
                </Col>
                <Col sm={8} >
                    <Card style={{margin:'0.5rem',textAlign:'left'}}>
                        <Card.Body>{n.email}</Card.Body>
                    </Card>
                </Col>
                <Col sm={2}>
                    
                    
                    {/* {this.state.myfriends.some(f=>f._id ===n._id)==1 && <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>} */}
                    <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>
                </Col>
                
            </Row>
          }      

        })}  
        </>
    
    )
    }
     
  }
}

export default ExploreNewFriend