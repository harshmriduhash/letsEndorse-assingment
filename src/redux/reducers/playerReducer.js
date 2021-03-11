import piecesService from '../../services/PiecesService';

const playerReducer = (state = piecesService.WHITE_PIECE, action) => {
    switch(action.type) {
        case 'NEW_GAME':
            return piecesService.WHITE_PIECE;
            break;

        case 'MOVE_PIECE':
            if (state === piecesService.WHITE_PIECE) {
                return piecesService.BLACK_PIECE;
            }
            else {
                return piecesService.WHITE_PIECE;
            }
            break;

        default:
            return state;
    }
    return state;
};

export default playerReducer;