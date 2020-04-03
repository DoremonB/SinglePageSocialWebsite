import React from 'react';
import {InputGroup,FormControl,ListGroup} from 'react-bootstrap'

export default class MyFilteringComponent extends React.Component {
    state = {
        initialItems: [],//Total list...this will never change
        itemsToDisplay: []
    }

    filterList = (event) => {
      let itemsToDisplay = this.state.initialItems.filter((item) => {
        return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
        if(event.target.value==""){
            this.setState({itemsToDisplay: []});
        }
        else{
            this.setState({itemsToDisplay: itemsToDisplay});
        }
      
    }

    componentWillMount = () => {
      this.setState({
          initialItems: this.props.content,
        //   itemsToDisplay: this.props.content
      })
    }

    render() {
      return (
        <div style={{width:'60%'}} className="container">
          
                <InputGroup className="m-3">
                    <FormControl
                    onChange={this.filterList}
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    {/* <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                    </InputGroup.Append> */}
                </InputGroup>          
          
          <ListGroup style={{ position:"absolute",zIndex:'1000',width:"60%" }} variant="flush">
            {
                this.state.itemsToDisplay.map(function(item) {
                    // return <div style={{backgroundColor:'#FFFFFF'}} key={item}>{item}</div>
                    return  <ListGroup.Item style={{backgroundColor:"#BBBBBB"}} onClick={(e)=>{console.log('heyy')}} as="button" key={item}>{item}</ListGroup.Item>
                    
                })
            }
            </ListGroup>
            
        </div>
      )
    }
}    
