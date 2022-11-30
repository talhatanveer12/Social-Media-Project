import React from 'react';
import Alert from '@mui/material/Alert';


const Error = (props) => {
    return (
        <Alert severity="error">{props.message}</Alert>
    );
}

export default Error;
