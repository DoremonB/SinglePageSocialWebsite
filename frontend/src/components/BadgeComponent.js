import React from 'react';
import ReactDOM from 'react-dom';
import { Badge,Button } from 'react-bootstrap';



class BadgeComponent extends React.Component {
  constructor(props){
    super(props)
  }
  onClickFun(e){
    console.log('onClick called ')
  }
  onMouseEnterFun(e){
    console.log(e.target.className)
  }

  render() {
    return (
        <div>
            <h1>
            Example heading <Badge variant="secondary">New</Badge>
            </h1>
            <h2>
            Example heading <Badge variant="secondary">New</Badge>
            </h2>
            <h3>
            Example heading <Badge variant="secondary">New</Badge>
            </h3>
            <h4>
            Example heading <Badge variant="secondary">New</Badge>
            </h4>
            <h5>
            Example heading <Badge variant="secondary">New</Badge>
            </h5>
            <h6>
            Example heading <Badge variant="secondary">New</Badge>
            </h6>

          <Button onMouseEnter={this.onMouseEnterFun} onClick={this.onClickFun} variant="primary">
            Profile <Badge variant="light">9</Badge>
            <span className="sr-only">unread messages</span>
          </Button> 

            <div>
              <Badge variant="primary">Primary</Badge>{' '}
              <Badge variant="secondary">Secondary</Badge>{' '}
              <Badge variant="success">Success</Badge>{' '}
              <Badge variant="danger">Danger</Badge>{' '}
              <Badge variant="warning">Warning</Badge> <Badge variant="info">Info</Badge>{' '}
              <Badge variant="light">Light</Badge> <Badge variant="dark">Dark</Badge>
            </div>           
        </div>
    
    ) 
  }
}

export default BadgeComponent