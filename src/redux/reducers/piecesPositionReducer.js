import movementsService from '../../services/MovementsService';
import promotionService from '../../services/PromotionService';

const piecesPositionReducer = (state, action) => {
    if (!state) {
        state = Object.assign({}, movementsService.initPiecesPosition);
    }
    switch(action.type) {
        case 'NEW_GAME':
            const piecesMap = movementsService.initPiecesPosition;
            return piecesMap;
            break;

        case 'MOVE_PIECE':
            if (action.selectedPiece) {
                const newPiecesMap = movementsService.move(action.selectedPiece, action.toPosition, action.availableMovements, state);
                return newPiecesMap;
            }
            break;

        case 'PAWN_PROMOTION_REPLACE':
            return promotionService.promotion(action.pieceName, action.pieceType, state);
            break;

        default:
            return state;
    }
    return state;
};


export default piecesPositionReducer;