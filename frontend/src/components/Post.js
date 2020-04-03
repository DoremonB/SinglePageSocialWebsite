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
import Comment from './Comment'
import MyFilteringComponent from './MyFilteringComponent'
import nature from '../images/nature.jpeg'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Like from './Like'

class Post extends React.Component {
  constructor(props){
    super(props)
    this.state={
        index:props.index
    }
  }
//Not completed yet

shouldComponentUpdate(nextProps) {
  
  
  if((this.props.post.Likes.length!=nextProps.post.Likes.length)||(this.props.post.Comments.length!=nextProps.post.Comments.length)){
    console.log("ummm :"+this.props.post._id+"  "+this.props.post.Comments.length+" $ "+nextProps.post.Comments.length)  
  }
  
  return ((this.props.post.Likes.length!=nextProps.post.Likes.length) || (this.props.post.Comments.length!=nextProps.post.Comments.length))
    
    
}
componentDidMount(){
  console.log('this.props.index'+this.state.index)
  
}
  


    

    
  render() {
    
    return (
        <>
      
                
<div>                
              <Card className="mb-2 p-3 text-left"  style={{ width: '100%',height:'auto' }}>
                {this.props.post.image_url!="" && <Card.Img variant="top" src={this.props.post.image_url} />}
                <Card.Body>
              <Card.Title>{this.props.post.caption}</Card.Title>
                  <Card.Text>
                  Posted created by <span className="font-weight-bold">{this.props.post.createdBy.email}</span> on {this.props.post.date}.
                  </Card.Text>
              
              <Button  value="Liked" index={this.props.index} id={this.props.post._id} onClick={this.props.parent.handleLike} variant="primary">Likes <Badge variant="light">{this.props.post.Likes.length}</Badge></Button>
              {/* <Like id={index} post={post} handleLike={this.props.parent.handleLike} /> */}
              
              <Button className="ml-1" variant="primary">Comments <Badge variant="light">{this.props.post.Comments.length}</Badge></Button>
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
                            <div>
                                <InputGroup className="mb-3 p-3">
                                    <FormControl
                                      onChange={this.props.parent.handleCommentChange}
                                      
                                      placeholder="Add Comment"
                                      aria-label="Recipient's username"
                                      aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                      {/* <Button value={this.props.parent.state.comment_content} onClick={this.props.parent.props.parent.toggleShow}  variant="outline-info">Comment</Button> */}
                                      <Button value={this.props.parent.state.comment_content} index={this.props.index} id={this.props.post._id} onClick={this.props.parent.handleComment}  variant="outline-info">Comment</Button>
                                      
                                    </InputGroup.Append>
                                </InputGroup>        
                            </div>

                            {/* Comments */}
                                <div style={{ maxHeight:'500px',overflowY:'scroll' }}>
                                {this.props.post.Comments.map((cmt)=>{
                                    // console.log("cmt123 "+cmt.content)
                                    // if(!cmt.content){
                                    
                                    // }
                                    console.log('cmt.createdBy.first_name'+cmt.createdBy.first_name)
                                    return (
                                    <>
                                        {/* <Comment cmt={cmt.content} /> */}
                                        <Comment  profile_pic={cmt.createdBy.profile_pic[cmt.createdBy.profile_pic.length-1]} createdBy={cmt.createdBy.first_name} content={cmt.content} />
                                    </>
                                    
                                    )
                                })}
                                </div>
                                {/* Comments End */}
                            
                            </>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>                
              </Card>



</div>

              
              
                    
    
    
    </>
                    )
                }
}

      
export default Post

