import React from 'react';
import ReactDOM from 'react-dom';
import { Button,ButtonGroup,ToggleButton } from 'react-bootstrap';

class ButtonComponent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isLoading:false
        }
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(e){
        console.log(this.state.isLoading)
        this.setState(prevState=>({
            // isLoading:!prevState.isLoading
            isLoading:true
        }))
        
    }


  render() {
    return (
    <div>
      <>
        <Button variant="primary">Primary</Button>{'    abcd '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
        <Button variant="warning">Warning</Button>{' '}
        <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
        <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
        <Button variant="link">Link</Button>
      </>
      <br></br><br></br>
        <>
        <Button variant="outline-primary">Primary</Button>{' '}
        <Button variant="outline-secondary">Secondary</Button>{' '}
        <Button variant="outline-success">Success</Button>{' '}
        <Button variant="outline-warning">Warning</Button>{' '}
        <Button variant="outline-danger">Danger</Button>{' '}
        <Button variant="outline-info">Info</Button>{' '}
        <Button variant="outline-light">Light</Button>{' '}
        <Button variant="outline-dark">Dark</Button>
        </>
<br></br><br></br>
        <>
        <Button href="#">Link</Button> <Button type="submit">Button</Button>{' '}
        <Button as="input" type="button" value="Input" />{' '}
        <Button as="input" type="submit" value="Submit" />{' '}
        <Button as="input" type="reset" value="Reset" />
        </>

<>
  <div className="mb-2 mt-2">
    <Button variant="primary" size="lg">
      Large button
    </Button>{' '}
    <Button variant="secondary" size="lg">
      Large button
    </Button>
  </div>

  <div className="mb-3">
    <Button variant="primary" size="sm">
      Small button
    </Button>{' '}
    <Button variant="secondary" size="sm">
      Small button
    </Button>
  </div>
</>

<>
  <Button variant="primary" size="lg" block>
    Block level button
  </Button>
  <Button variant="secondary" size="lg" block>
    Block level button
  </Button>
</>

<>
  <Button variant="primary" size="lg" active>
    Primary button
  </Button>{' '}
  <Button variant="secondary" size="lg" active>
    Button
  </Button>
</>
<br></br><br></br>
<>
  <Button variant="primary" size="lg" disabled>
    Primary button
  </Button>{' '}
  <Button variant="secondary" size="lg" disabled>
    Button
  </Button>{' '}
  <Button href="#" variant="secondary" size="lg" disabled>
    Link
  </Button>
</>
<br></br><br></br>
<Button
      variant="primary"
      disabled={this.state.isLoading}
      onClick={!this.state.isLoading ? this.handleClick : null}
    >
      {this.state.isLoading ? 'Loading…' : 'Click to load'}
</Button>

<br></br><br></br>
<>
  <ButtonGroup toggle className="mb-2">
    <ToggleButton type="checkbox" defaultChecked value="1">
      Checked
    </ToggleButton>
  </ButtonGroup>
  <br />
  <ButtonGroup toggle>
    <ToggleButton onClick={this.handleClick} type="radio" name="radio" defaultChecked value="1">
      Active
    </ToggleButton>
    <ToggleButton type="radio" name="radio" value="2">
      Radio
    </ToggleButton>
    <ToggleButton  type="radio" name="radio" value="3">
      Radio
    </ToggleButton>
  </ButtonGroup>
</>

    </div>
    
    ) 
  }
}

export default ButtonComponent