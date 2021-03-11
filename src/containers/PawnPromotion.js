import React from 'react';
import {disablePawnPromotionAction, pawnPromotionReplaceAction } from '../redux/actions';

import blackrook from '../images/pieces/black-rook.png';
import whiterook from '../images/pieces/white-rook.png';
import blackqueen from '../images/pieces/black-queen.png';
import whitequeen from '../images/pieces/white-queen.png';
import blackbishop from '../images/pieces/black-bishop.png';
import whitebishop from '../images/pieces/white-bishop.png';
import blackknight from '../images/pieces/black-knight.png';
import whiteknight from '../images/pieces/white-knight.png';

import PieceComponent from '../components/Piece';
import piecesService from '../services/PiecesService';
import promotionService from '../services/PromotionService';

import { connect } from 'react-redux';

class PawnPromotion extends React.Component {

    handleClick = (pieceName, pieceType) => {
        // Disabled the pawn promotion interface.
        this.props.disablePawnPromotion();

        // Replace the pawn by the selected "pieceType".
        this.props.replacePawn(pieceName, pieceType);
    }

    render() {
        const pieceName = promotionService.getPromotedPieceName(this.props.piecesPosition);
        return (
            <div className={'pawn-promotion ' + (this.props.pawnPromotion ? '' : 'hidden')} >
               <div className="label">
                   Select a piece to replace the pawn 
               </div>
               <div className="piece-selector">
               <div className="rook-button">
                   <PieceComponent
                        selected={false}  
                        className="row5 columnC"
                        image={piecesService.getPieceColor(pieceName) === piecesService.WHITE_PIECE ? whiterook : blackrook}
                        onClick={() => (this.handleClick(pieceName, piecesService.ROOK))}
                    />
                </div>

                <div className="knight-button">
                    <PieceComponent
                        selected={false}  
                        className="row5 columnD"
                        image={piecesService.getPieceColor(pieceName) === piecesService.WHITE_PIECE ? whiteknight : blackknight}
                        onClick={() => (this.handleClick(pieceName, piecesService.KNIGHT))}
                    />
                </div>

                <div className="bishop-button">
                    <PieceComponent
                        selected={false}  
                        className="row5 columnE"
                        image={piecesService.getPieceColor(pieceName) === piecesService.WHITE_PIECE ? whitebishop : blackbishop}
                        onClick={() => (this.handleClick(pieceName, piecesService.BISHOP))}
                    />
                </div>

                <div className="queen-button">
                    <PieceComponent
                        selected={false}  
                        className="row5 columnF"
                        image={piecesService.getPieceColor(pieceName) === piecesService.WHITE_PIECE ? whitequeen : blackqueen}
                        onClick={() => (this.handleClick(pieceName, piecesService.QUEEN))}
                    />
                </div>
               </div>
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        selectedPiece: state.selectedPiece,
        pawnPromotion: state.pawnPromotion,
        piecesPosition: state.piecesPosition
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        disablePawnPromotion: () => {
            dispatch(disablePawnPromotionAction());
        },
        replacePawn: (pieceName, pieceType) => {
            dispatch(pawnPromotionReplaceAction(pieceName, pieceType));
        }
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(PawnPromotion);
