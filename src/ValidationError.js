import React from 'react';

export default function ValidationError(props) {
    if(props.message) {
        return (
            <p className='error' style={{color: "#E37400", fontSize:"12px"}}> {props.message} </p>
        );
    }
    return <></>
}
