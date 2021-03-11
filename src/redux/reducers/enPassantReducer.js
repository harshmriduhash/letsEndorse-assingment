import enPassantService from '../../services/EnPassantService';

const enPassantReducer = (state = [], action) => {
    let newState = [];
    switch(action.type) {
        case 'NEW_GAME':
            return newState;
            break;

        case 'MOVE_PIECE':
            if (action.selectedPiece !== '') {
                newState = enPassantService.getAvailables(action.selectedPiece, action.toPosition, action.piecesPosition, newState);
            }
            return newState;
            break;

        default:
            return state;
    }
    return state;
};

export default enPassantReducer;