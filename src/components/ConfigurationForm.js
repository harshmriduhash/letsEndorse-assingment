import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ConfigurationForm = props => {
const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
        <h2>Configuration</h2>
        <form onSubmit={handleSubmit}>
        <div className="line">
            <label htmlFor="NumberOfPlayers">Nb of players:&nbsp;</label>
            <div className="value"> 2</div>
        </div>
        <div className="line">
            <label htmlFor="autoflip">Auto flip:&nbsp;</label>
            <div className="value">
                <Field 
                    id="autoflip" 
                    name="autoflip" 
                    component="input" 
                    type="checkbox" 
                    />
            </div>
        </div>
        <div className="line">
            <label htmlFor="helpmove">Help on move:&nbsp;</label>
            <div className="value">
                <Field 
                    id="helpmove" 
                    name="helpmove" 
                    component="input" 
                    type="checkbox" 
                    />
            </div>
        </div>
        <div className="large-line">
            <label htmlFor="color">Squares color:&nbsp;</label>
            <div className="value box">
            <Field name="color" component="select" >
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
                <option value="violet">Violet</option>
            </Field>
            </div>
        </div>
        <div className="line-center">
        {
            props.onStop !== undefined ? 
                <button onClick={props.onStop}
                    className="stop"
                >
                    Stop
                </button> 
            : ''
        }
            <button 
                type="submit"
                className="submit"
            >
                {props.submitLabel}
            </button>
        </div>
        </form>
    </div>
  )
}

ConfigurationForm = reduxForm({
    // a unique name for the form
    form: 'configuration'
  })(ConfigurationForm)
  
  export default ConfigurationForm;