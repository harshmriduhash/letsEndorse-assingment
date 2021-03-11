import React from 'react';
import { connect } from 'react-redux';
import piecesService from '../services/PiecesService';
import { pendingGameAction, continueGameAction } from '../redux/actions';

class GameStatus extends React.Component {

    handleClick = () => {
        if (this.props.configuration['status'] !== 'pending') {
            this.props.pendingGame();
        }
        else {
            this.props.continueGame({});
        }
    }


    render() {
        let status = '';
        let playerColor = '';
        if(this.props.checkOrCheckMat['status'] !== undefined) {
            playerColor = this.props.checkOrCheckMat['color'];
            status = this.props.checkOrCheckMat['status'];
        }
        return (
            <div className="game-status">
                <div className={this.props.configuration['status'] === 'pending' ? 'menu active': 'menu'} onClick={this.handleClick}></div>
                <div className="play-status">{ piecesService.getColorLabel(this.props.nextPlayer)  + ' to play.'}</div>
                <div className={"check-status " + (playerColor === '' ? 'hidden' : '')} >{piecesService.getColorLabel(playerColor) + ' are ' + status + '.'}</div>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        nextPlayer: state.nextPlayer,
        checkOrCheckMat: state.checkOrCheckMat,
        configuration: state.configuration,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        pendingGame: () => {
            dispatch(pendingGameAction());
        },
        continueGame: (value) => {
            dispatch(continueGameAction(value));
        },
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(GameStatus);
