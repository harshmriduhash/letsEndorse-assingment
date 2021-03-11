import React from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import ConfigurationForm from '../components/ConfigurationForm';
import { continueGameAction, restartGameAction } from '../redux/actions';

class GameConf extends React.Component {

    render() {
        return (
            <div className={this.props.configuration['status'] !== 'pending' ? 'hidden' : ''} >
                <Fade top when={this.props.configuration['status'] === 'pending'}>
                    <div className="game-conf">
                        <h1>Menu</h1>
                        <ConfigurationForm 
                            onSubmit={this.props.continueGame} 
                            initialValues={this.props.configuration} 
                            submitLabel="Save and continue"
                            onStop={this.props.stopGame}
                        />
                    </div>
                </Fade>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        configuration: state.configuration,
        form: state.form,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        continueGame: (values) => {
            dispatch(continueGameAction(values));
        },
        stopGame: (event) => {
            event.preventDefault();
            dispatch(restartGameAction());
        },
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(GameConf);
