import React from 'react';
import ReactDOM from 'react-dom';
import { Accordion,Card,Button } from 'react-bootstrap';


class AccordionComponent extends React.Component {
  render() {
    return (
    <div>
      {/* to prevent anything from opening dont pass defaultActiveKey in below statement  */}
          <Accordion defaultActiveKey="66">


          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="66">
                Click me!
              </Accordion.Toggle>
            </Card.Header>

            <Accordion.Collapse eventKey="66">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          
          </Card>
          {/* keeping eventKey =(whatever number that is defaultActivity=?) opens  */}

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="323232319">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="323232319">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>

          
        </Accordion> 
    </div>
    
    ) 
  }
}

export default AccordionComponent