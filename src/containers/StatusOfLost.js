import React from 'react';
import { connect } from 'react-redux';
import piecesService from '../services/PiecesService';



class StatusOfLost extends React.Component {

    render() {
        let bag = {
            [piecesService.BLACK_PIECE]: {
                value: 0,
                [piecesService.PAWN] : 0,
                [piecesService.KNIGHT] : 0,
                [piecesService.BISHOP] : 0,
                [piecesService.ROOK] : 0,
                [piecesService.QUEEN] : 0,
            },
            [piecesService.WHITE_PIECE]: {
                value: 0,
                [piecesService.PAWN] : 0,
                [piecesService.KNIGHT] : 0,
                [piecesService.BISHOP] : 0,
                [piecesService.ROOK] : 0,
                [piecesService.QUEEN] : 0,
            }
        };
        let whiteDiff = 0;
        let blackDiff = 0;
        if (this.props.history.length > 0) {
            const lostPieces = this.props.history[this.props.history.length - 1]['lost'];
            if (lostPieces.length > 0) {
                for (const key in lostPieces) {
                    const piece = lostPieces[key];
                    const value = piecesService.getPieceValue(piece);
                    const pieceType = piecesService.getPieceType(piece);
                    bag[piecesService.getPieceColor(piece)]['value'] = bag[piecesService.getPieceColor(piece)]['value'] + value; 
                    bag[piecesService.getPieceColor(piece)][pieceType] = bag[piecesService.getPieceColor(piece)][pieceType] + 1; 
                }

                whiteDiff = bag[piecesService.BLACK_PIECE]['value'] - bag[piecesService.WHITE_PIECE]['value'];
                blackDiff = whiteDiff * (-1);
            }
        }

        return (
            <div className="status-of-lost">
                <div className="bag blacks-bag">
                    <span className={bag[piecesService.WHITE_PIECE][piecesService.QUEEN] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-queen"></i>
                    </span>
                    <span className={bag[piecesService.WHITE_PIECE][piecesService.ROOK] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-rook"></i>
                        <span className="font-small">
                            {bag[piecesService.WHITE_PIECE][piecesService.ROOK] < 2 ? '' : 'x' + bag[piecesService.WHITE_PIECE][piecesService.ROOK]}
                        </span>
                    </span>
                    <span className={bag[piecesService.WHITE_PIECE][piecesService.BISHOP] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-bishop"></i>
                        <span className="font-small">
                            {bag[piecesService.WHITE_PIECE][piecesService.BISHOP] < 2 ? '' : 'x' + bag[piecesService.WHITE_PIECE][piecesService.BISHOP]}
                        </span>
                    </span>
                    <span className={bag[piecesService.WHITE_PIECE][piecesService.KNIGHT] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-knight"></i>
                        <span className="font-small">
                            {bag[piecesService.WHITE_PIECE][piecesService.KNIGHT] < 2 ? '' : 'x' + bag[piecesService.WHITE_PIECE][piecesService.KNIGHT]}
                        </span>
                    </span>
                    <span className={bag[piecesService.WHITE_PIECE][piecesService.PAWN] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-pawn"></i>
                        <span className="font-small">
                            {bag[piecesService.WHITE_PIECE][piecesService.PAWN] < 2 ? '' : 'x' + bag[piecesService.WHITE_PIECE][piecesService.PAWN]}
                        </span>
                    </span>
                    <span className={whiteDiff !== 0 ? 'diff' : 'hidden'}>
                        <span className={blackDiff > 0 ? 'ok' : 'ko'}>{'(' + blackDiff + ')'}</span>
                    </span>
                </div>

                <div className="bag whites-bag">
                    <span className={bag[piecesService.BLACK_PIECE][piecesService.QUEEN] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-queen"></i>
                    </span>
                    <span className={bag[piecesService.BLACK_PIECE][piecesService.ROOK] !== 0 ? 'piece-type' : 'hidden'}>
                    <i className="fas fa-chess-rook"></i>
                        <span className="font-small">
                            {bag[piecesService.BLACK_PIECE][piecesService.ROOK] < 2 ? '' : 'x' + bag[piecesService.BLACK_PIECE][piecesService.ROOK]}
                        </span>
                    </span>
                    <span className={bag[piecesService.BLACK_PIECE][piecesService.BISHOP] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-bishop"></i>
                        <span className="font-small">
                            {bag[piecesService.BLACK_PIECE][piecesService.BISHOP] < 2 ? '' : 'x' + bag[piecesService.BLACK_PIECE][piecesService.BISHOP]}
                        </span>
                    </span>
                    <span className={bag[piecesService.BLACK_PIECE][piecesService.KNIGHT] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-knight"></i>
                        <span className="font-small">
                            {bag[piecesService.BLACK_PIECE][piecesService.KNIGHT] < 2 ? '' : 'x' + bag[piecesService.BLACK_PIECE][piecesService.KNIGHT]}
                        </span>
                    </span>
                    <span className={bag[piecesService.BLACK_PIECE][piecesService.PAWN] !== 0 ? 'piece-type' : 'hidden'}>
                        <i className="fas fa-chess-pawn"></i>
                        <span className="font-small">
                            {bag[piecesService.BLACK_PIECE][piecesService.PAWN] < 2 ? '' : 'x' + bag[piecesService.BLACK_PIECE][piecesService.PAWN]}
                        </span>
                    </span>
                    <span className={whiteDiff !== 0 ? 'diff' : 'hidden'}>
                        <span className={whiteDiff > 0 ? 'ok' : 'ko'}>{ '('+ whiteDiff + ')' }</span>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        history: state.history,
    }
};

export default connect(mapStatesToProps)(StatusOfLost);
