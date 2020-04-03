import React from 'react';
import ReactDOM from 'react-dom';
import { Button,ButtonGroup,ButtonToolbar,DropdownButton,Dropdown } from 'react-bootstrap';

class ButtonGroupComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
        buttonName:"just checking if we can set button name like this"
    }
    this.handleClick=this.handleClick.bind(this)
  }
handleClick(e){
    console.log(e.target.className)
    console.log(e.target.name)
}  


  render() {
    return (
    <div>
<ButtonGroup onClick={this.handleClick} aria-label="Basic example">
  <Button name="secondary" variant="secondary">Left</Button>
  <Button name={this.state.buttonName} variant="secondary">Middle</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup> 

<ButtonToolbar onClick={this.handleClick} aria-label="Toolbar with button groups">
  <ButtonGroup  className="mr-2" aria-label="First group">
    <Button name="first">1</Button> <Button>2</Button> <Button>3</Button> <Button>4</Button>
  </ButtonGroup>
  <ButtonGroup className="mr-2" aria-label="Second group">
    <Button>5</Button> <Button>6</Button> <Button>7</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Third group">
    <Button>8</Button>
  </ButtonGroup>
</ButtonToolbar>

<>
  <ButtonGroup size="lg" className="mb-2 mt-2">
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
  <br />
  <ButtonGroup className="mb-2">
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
  <br />
  <ButtonGroup size="sm">
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
</>

<br></br><br></br>

<ButtonGroup>
  <Button>1</Button>
  <Button>2</Button>

  <DropdownButton onClick={this.handleClick} as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
    <Dropdown.Item name="i1" eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item name="i2" eventKey="2">Dropdown link</Dropdown.Item>
  </DropdownButton>
</ButtonGroup>

<ButtonGroup vertical>
  <Button>Button</Button>
  <Button>Button</Button>

  <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
  </DropdownButton>

  <Button>Button</Button>
  <Button>Button</Button>

  <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-2">
    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
  </DropdownButton>

  <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3">
    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
  </DropdownButton>
</ButtonGroup>


    </div>
    
    ) 
  }
}

export default ButtonGroupComponent