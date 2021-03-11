import enPassantService from '../../services/EnPassantService';
import piecesService from '../../services/PiecesService';

const historyReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_GAME':
            return [];
            break;

        case 'MOVE_PIECE':
            let newState = [];
            let lost = [];
            if (state.length > 0) {
                for (const key in state) {
                    newState.push(state[key]);
                    lost = state[key].lost;
                }
            }
            if (action.piecesPosition[action.toPosition] !== undefined) {
                lost.push(action.piecesPosition[action.toPosition]);
            }
            else {
                if (enPassantService.isAnEnPassantMove(action.selectedPiece, action.toPosition, action.piecesPosition)) {
                    if (piecesService.isWhite(action.selectedPiece)) {
                        lost.push(piecesService.getPawn(piecesService.BLACK_PIECE));
                    }
                    else {
                        lost.push(piecesService.getPawn(piecesService.WHITE_PIECE));
                    }
                }
            }
            newState.push({
                selectedPiece: action.selectedPiece,
                toPosition: action.toPosition,
                initialPiecesMap: action.piecesPosition,
                lost: lost
            });
            return newState;
            break;

        default:
            return state;
    }
    return state;
};

export default historyReducer;