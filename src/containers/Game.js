import React from 'react';
import { connect } from 'react-redux';

import GameStatus from './GameStatus';
import Board from './Board';
import StatusOfLost from './StatusOfLost';
import Pieces from './Pieces';
import PawnPromotion from './PawnPromotion';
import GameConf from './GameConf';
import piecesService from '../services/PiecesService';
import History from '../services/HistoryService';

class Game extends React.Component {

    render() {
        let reverse = false;
        return (
            <div className="game">
                <div className={'game-board ' + (this.props.configuration.autoflip && this.props.nextPlayer === piecesService.BLACK_PIECE ? 'reverse' : 'regular') }>
                    <GameStatus />
                    <Board reverse={reverse} lastMove={this.props.history.getLastMove()} />
                    <StatusOfLost />
                    <Pieces pieces={this.props.piecesPosition} />
                    <PawnPromotion />
                    <GameConf />
                </div>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        piecesPosition: state.piecesPosition,
        configuration: state.configuration,
        nextPlayer: state.nextPlayer,
        history: new History(state.history),
    }
};

export default connect(mapStatesToProps)(Game);
