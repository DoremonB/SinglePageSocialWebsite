import React from 'react';

class Content extends React.Component {
    componentWillMount() {
       console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
       console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {    
       console.log("###componentWillReceiveProps "+newProps.id)
       console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
       // return true
       return (this.props.myNumber.v2!=newProps.myNumber.v2);
    }
    componentWillUpdate(nextProps, nextState) {
       console.log('Component WILL UPDATE!'+nextProps.id);
    }
    componentDidUpdate(prevProps, prevState) {
       console.log('Component DID UPDATE!'+prevProps.id)
    }
    componentWillUnmount() {
       console.log('Component WILL UNMOUNT!')
    }
    render() {
       return (
          <div>
             <h3>{this.props.myNumber.v2}</h3>
          </div>
       );
    }
 }

  
export default Content