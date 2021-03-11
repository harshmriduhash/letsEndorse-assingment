import React from 'react';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import ConfigurationForm from '../components/ConfigurationForm';
import { newGameAction } from '../redux/actions';

class GameIntro extends React.Component {

    submit = (values) => {
        this.props.newGame(values)
    }

    render() {
        return (
            <div className={this.props.configuration['status'] !== 'intro' ? 'hidden' : 'overlay'}>
                <Zoom duration={1000}>
                    <div className="game-intro">
                        <h1>Chess game</h1>
                        <ConfigurationForm 
                            onSubmit={this.submit} 
                            initialValues={this.props.configuration} 
                            submitLabel="Start"
                        />
                    </div>
                </Zoom>
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
        newGame: (values) => {
            dispatch(newGameAction(values));
        },
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(GameIntro);
