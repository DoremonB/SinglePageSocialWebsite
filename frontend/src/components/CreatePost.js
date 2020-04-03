import React, { Component } from 'react'
import { Toast,Card,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';

import { Redirect } from 'react-router';
import props from 'prop-types';
import axios from 'axios'
import { createPostFun } from '../functions/funtions'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {},
      profileData:'abc',
      fileurl:'http://localhost:5000/users/upload',
      image_file: null,
      image_preview:'',
      caption:''
      
    }
    this.handleSubmitFile = this.handleSubmitFile.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)
    this.captionChange=this.captionChange.bind(this)
  }

 

captionChange(e) {
  this.setState({ caption: e.target.value })
}

async handleSubmitFile (){
  console.log('here clicked')
  const data = new FormData() 
  data.append('image', this.state.image_file)
  data.append('caption',this.state.caption)
   
  for (var [key, value] of data.entries()) { 
    console.log(key, value);
  }

  const res=await createPostFun(data)

  // const res=await axios.post("http://localhost:5000/users/createPost", data, 
  // {
  //   headers: {
  //       "Authorization": "Bearer "+localStorage.usertoken,
  //       "Content-type": "multipart/form-data",
  //   },                    
  // })
      // .then(res => { // then print response status
        console.log(res.data)
      // })
  
}

handleImagePreview = (e) => {
  let image_as_base64 = URL.createObjectURL(e.target.files[0])
  let image_as_files = e.target.files[0];

  console.log(this.state.image_preview)
  this.setState({
      image_preview: image_as_base64,
      image_file: image_as_files,
  })
  
}

  render() {
    
    return (
      
      <div>
        
        
        
<Form className="text-left">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter Caption</Form.Label>
    <Form.Control value={this.state.caption} name="caption" onChange={this.captionChange} type="text" placeholder="Enter caption" />
    
  </Form.Group>

  
    

<div class="custom-file">
    <input onChange={this.handleImagePreview} type="file" class="custom-file-input" id="customFile" />
    <label class="custom-file-label" for="customFile">Choose file</label>
</div>


  
 
       


        {/* image preview */}
        
            <br></br>
       
            
            
  
  <Button className="mt-2" onClick={this.handleSubmitFile} value="Submit" variant="primary">
    Submit
  </Button>
</Form> 
        
      </div>
    )
  }
}

export default CreatePost