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

import { allusersmyfriendsFun, removeFriendFun } from '../functions/funtions'

class Friend extends React.Component {
  constructor(props){
    super(props)
    this.state={
        myDisplayList:[],
        myCompleteList:[],
        myfriends:[]
    }
    
    this.handleRemove=this.handleRemove.bind(this)
  }

  async componentDidMount() {
    console.log("inside didmount")
  //   const myfriends=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

  const myfriends=await allusersmyfriendsFun()

  console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:myfriends.data,
        myDisplayList:myfriends.data,
        myfriends:myfriends.data
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

    const response=await removeFriendFun(bodyParameters)

    console.log(response.data)

   

  //   const myfriends=await axios.post('http://localhost:5000/users/allusersmyfriends',{},
  //   {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })

  const myfriends=await allusersmyfriendsFun()

  console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:myfriends.data,
        myDisplayList:myfriends.data,
        myfriends:myfriends.data
    })


  }

  filterList = (event) => {
    let myDisplayList = this.state.myCompleteList.filter((item) => {
      if(item.first_name.toLowerCase().search(event.target.value.toLowerCase()) !== -1){
        return item
      }
        
    });
      if(event.target.value==""){
          this.setState({myDisplayList: []});
      }
      else{
          this.setState({myDisplayList: myDisplayList});
      }
    
  }
 
  render() {
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
            return <Row style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                <Col sm={2} >
                    <Image style={{height:'auto',width:'100%',margin:'0.5rem'}} src={nature} roundedCircle />
                </Col>
                <Col sm={8} >
                    <Card style={{margin:'0.5rem',textAlign:'left'}}>
                        <Card.Body>{n.email}</Card.Body>
                    </Card>
                </Col>
                <Col sm={2}>
                    <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>
                </Col>
                
            </Row>      
        })}  
        </>
    
    ) 
  }
}

export default Friend