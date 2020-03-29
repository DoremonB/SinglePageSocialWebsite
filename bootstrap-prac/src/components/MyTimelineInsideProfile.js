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


class MyTimeline extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      comment_content:'',
      show:false,
      allposts:[]
    }
    this.handleComment=this.handleComment.bind(this)
    this.handleCommentChange=this.handleCommentChange.bind(this)
    
    this.handleLike=this.handleLike.bind(this)

  }
  async componentDidMount(){
    
    const allposts=await axios.post('http://localhost:5000/users/myallposts',
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )

    console.log('Likeee my '+allposts.data)
    this.setState({
      allposts:allposts.data
    })
  }
  handleCommentChange(e){
    this.setState({
      comment_content:e.target.value
    })
  }


  async handleLike(e){
    
    let x=e.target.id
    console.log("id of post liked(x) :"+x)

    const bodyParameters = {
      postId: x
    };
    

    const allposts1=await axios.post('http://localhost:5000/users/like',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )



    console.log(allposts1.data)
    
    // this.setState({
    //   allposts:allposts.data
    // })
    const allposts=await axios.post('http://localhost:5000/users/myallposts',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )

    console.log('Likeee '+allposts.data)
    this.setState({
      allposts:allposts.data
    })
    
  }

  async handleComment(e){
    console.log("shld be called when cmt : "+e.target.value)
    // this.setState({
    //   comment_content:"You commented "+e.target.value,
    //   show:true
    // })
    console.log(e.target.value)
    let y=e.target.value
    let x=e.target.id
    console.log("comment(y) :"+y)
    console.log("id of post liked(x) :"+x)

    const bodyParameters = {
      content: y,
      postId:x
    };
    

    const allposts1=await axios.post('http://localhost:5000/users/createComment',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )



    console.log(allposts1.data)
    
    // this.setState({
    //   allposts:allposts.data
    // })
    const allposts=await axios.post('http://localhost:5000/users/myallposts',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )

    console.log('Likeee '+allposts.data)
    this.setState({
      allposts:allposts.data
    })

  }
  render() {
    return (
      <>
      

    
        <Container >
        
<Form  className="text-left">

<Form.Group  controlId="exampleForm.ControlTextarea1">
    
    <Form.Control  placeholder="What's on your mind" as="textarea" rows="3" />
    <Button onClick={this.props.parent.showModalFun} className="justify-content-end mt-2" variant="primary" >
        Submit
    </Button>
</Form.Group>                
</Form>
            
          
          
          <Row>

            


            {/* right side */}


            <Col className="border border-primary" sm={12}>

              
            
            <div className="p-5">

            
              {this.state.allposts.map(post=>{

              
              return (
<div>                
              <Card className="mb-2 p-3 text-left"  style={{ width: '100%',height:'auto' }}>
                <Card.Img variant="top" src={post.image_url} />
                <Card.Body>
              <Card.Title>{post.caption}</Card.Title>
                  <Card.Text>
                    Posted created by {post.createdBy} on {post.date}.
                  </Card.Text>
              {/* <Button  value="Liked" onClick={this.props.parent.toggleShow} variant="primary">Likes <Badge variant="light">{post.Likes.length}</Badge></Button> */}
              <Button  value="Liked" id={post._id} onClick={this.handleLike} variant="primary">Likes <Badge variant="light">{post.Likes.length}</Badge></Button>
              
              <Button className="ml-1" variant="primary">Comments <Badge variant="light">{post.Comments.length}</Badge></Button>
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
                onChange={this.handleCommentChange}
                
                placeholder="Add Comment"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                {/* <Button value={this.state.comment_content} onClick={this.props.parent.toggleShow}  variant="outline-info">Comment</Button> */}
                <Button value={this.state.comment_content} id={post._id} onClick={this.handleComment}  variant="outline-info">Comment</Button>
                
              </InputGroup.Append>
          </InputGroup>        
      </div>
      <div>
        {post.Comments.map((cmt)=>{
          // console.log("cmt123 "+cmt.content)
          // if(!cmt.content){
            
          // }
          return (
            <>
              {/* <Comment cmt={cmt.content} /> */}
              <Comment createdBy={cmt.createdBy} content={cmt.content} />
            </>
            
          )
        })}
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

export default MyTimeline











// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
// import AlertComponent from './AlertComponent'
// import AccordionComponent from './AccordionComponent'
// import BadgeComponent from './BadgeComponent'
// import BreadcrumbComponent from './BreadcrumbComponent'
// import ButtonComponent from './ButtonComponent'
// import ButtonGroupComponent from './ButtonGroupComponent'
// import CardComponent from './CardComponent'
// import Comment from './Comment'
// import MyFilteringComponent from './MyFilteringComponent'
// import nature from '../images/nature.jpeg'
// import axios from 'axios';


// class MyTimeline extends React.Component {
//   constructor(props){
//     super(props)
//     console.log(props)
//     this.state={
//       comment_content:'',
//       show:false,
//       allposts:[]
//     }
//     this.handleComment=this.handleComment.bind(this)

//   }
//   async componentDidMount(){
    
//     const allposts=await axios.post('http://localhost:5000/users/myallposts',{},
//     {
//       headers:{
//         'authorization':'Bearer '+localStorage.usertoken,
//         "Content-type": "multipart/form-data",
//       }
//     }
//     )

//     console.log(allposts.data)
//     this.setState({
//       allposts:allposts.data
//     })
//   }
//   handleComment(e){
//     this.setState({
//       comment_content:"You commented "+e.target.value,
//       show:true
//     })
//     console.log(e.target.value)

//   }
//   render() {
//     return (
//       <>
      

    
//         <Container >
        
// <Form  className="text-left">

// <Form.Group  controlId="exampleForm.ControlTextarea1">
    
//     <Form.Control  placeholder="What's on your mind" as="textarea" rows="3" />
//     <Button onClick={this.props.parent.showModalFun} className="justify-content-end mt-2" variant="primary" >
//         Submit
//     </Button>
// </Form.Group>                
// </Form>
            
          
          
//           <Row>

            


//             {/* right side */}


//             <Col className="border border-primary" sm={12}>

              
            
//             <div className="p-5">

            
//               {this.state.allposts.map(post=>{
//               console.log('i am called to rerender')
              
//               return (
// <div>                
//               <Card className="mb-2 p-3 text-left"  style={{ width: '100%',height:'auto' }}>
//                 <Card.Img variant="top" src={post.image_url} />
//                 <Card.Body>
//               <Card.Title>{post.caption}</Card.Title>
//                   <Card.Text>
//                     Some quick example text to build on the card title and make up the bulk of
//                     the card's content.
//                   </Card.Text>
//               <Button value="Liked" onClick={this.props.parent.toggleShow} variant="primary">Likes <Badge variant="light">{post.Likes.length}</Badge></Button>
//               <Button className="ml-1" variant="primary">Comments <Badge variant="light">{post.Comments.length}</Badge></Button>
//                 </Card.Body>
// <Accordion>
// <Card>
//   <Card.Header>
//     <Accordion.Toggle as={Button} variant="link" eventKey="0">
//       Show all comments
//     </Accordion.Toggle>
//   </Card.Header>
//   <Accordion.Collapse eventKey="0">
//       <>
//       <div>
//           <InputGroup className="mb-3 p-3">
//               <FormControl
                
//                 onChange={this.handleComment}
//                 placeholder="Add Comment"
//                 aria-label="Recipient's username"
//                 aria-describedby="basic-addon2"
//               />
//               <InputGroup.Append>
//                 <Button value={this.state.comment_content} onClick={this.props.parent.toggleShow}  variant="outline-info">Comment</Button>
//               </InputGroup.Append>
//           </InputGroup>        
//       </div>
//       <div>
//         {post.Comments.map((cmt)=>{
//           console.log("cmt "+cmt)
//           return (
//             <>
//               <Comment cmt={cmt} />
//             </>
            
//           )
//         })}
//       </div>
      
//       </>
//   </Accordion.Collapse>
// </Card>
// </Accordion>                
//               </Card>



// </div>
//               )

//               })}


//             </div>

//             </Col>
//           </Row>

//         </Container>




      
//       </>



    
//     ) 
//   }
// }

// export default MyTimeline