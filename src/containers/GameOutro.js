import React from 'react';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import { restartGameAction } from '../redux/actions';
import piecesService from '../services/PiecesService';

class GameOutro extends React.Component {

    handleClick = () => {
        this.props.restartGame();
    }

    render() {
        let winner = '';
        if (this.props.checkOrCheckMat.status !== 'pat') {
            winner = this.props.checkOrCheckMat.color === piecesService.WHITE_PIECE ? piecesService.BLACK_PIECE : piecesService.WHITE_PIECE;
        
        }
        
        return (
            <div className={this.props.configuration['status'] !== 'outro' ? 'hidden' : 'overlay'}>
                <Zoom duration={1000}>
                    <div className="game-outro">
                        <h1>And the winner is...</h1>
                        <div className="line-center">
                            <b>{winner !== '' ? piecesService.getColorLabel(winner): ''}</b>{winner !== '' ? ', congratulations !' : 'No winner for this game.'}
                        </div>
                        <div className="line-center">
                            <button onClick={this.handleClick} className="submit">Start a new Game</button>
                        </div>
                    </div>
                </Zoom>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        configuration: state.configuration,
        checkOrCheckMat: state.checkOrCheckMat
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        restartGame: () => {
            dispatch(restartGameAction());
        },
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(GameOutro);
