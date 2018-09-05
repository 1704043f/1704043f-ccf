import React, { Component } from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField'
import DoneIcon from '@material-ui/icons/Done';


class FormTextFocused extends Component {  

    renderTextField(field) {
        console.log("field: ", field)
    const {meta: {touched, error}} = field;
        return (
            <div>
                <TextField
                    label={field.label}
                        {...field.input}    
                    margin="normal"
                    style={{width: "250px"}}
                    autoFocus
                />
                
                <div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div>
                <div style={{fontSize: "13px", color: "green"}}> 
                    {touched && !error ? <DoneIcon /> : ''}
                </div>

            </div>
        )
    };

    render () {

        return (

            <Field 
                name={this.props.name}
                label={this.props.label}
                component={this.renderTextField}
                autoComplete="off"
                
            />

        )
    }
}

export default FormTextFocused;