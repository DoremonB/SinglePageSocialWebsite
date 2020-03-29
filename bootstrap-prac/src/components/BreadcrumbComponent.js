import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'react-bootstrap';


class BadgeComponent extends React.Component {
  render() {
    return (
    <div>
            <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>

                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>        
    </div>
    
    ) 
  }
}

export default BadgeComponent