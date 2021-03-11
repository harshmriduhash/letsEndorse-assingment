import {castlingService} from '../../services/CastlingService';

const castlingReducer = (state = castlingService.initCastling, action) => {
    switch(action.type) {
        case 'NEW_GAME':
            return castlingService.initCastling;
            break;

        case 'SELECT_PIECE':
            if (action.selectedPiece !== '') {
                let newState = castlingService.evaluateCastling(action.selectedPiece, action.piecesPosition, state);
                return newState;
            }
            break;

        default:
            return state;
    }
    return state;
};

export default castlingReducer;