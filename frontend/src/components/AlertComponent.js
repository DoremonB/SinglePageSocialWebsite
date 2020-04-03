import React from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';


class AlertComponent extends React.Component {
  render() {
    return (
    <div>
        {['primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        ].map((variant, idx) => (
        <Alert key={idx} variant={variant}>
            This is a {variant} alert—check it out!
        </Alert>
        ))}

    </div>
    
    ) 
  }
}

export default AlertComponent