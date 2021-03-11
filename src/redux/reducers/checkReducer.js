import movementsService from '../../services/MovementsService';

const PAT = 'pat';
const CHECK = 'check';
const CHECK_MAT = 'check mat';

const checkReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type) {
        case 'NEW_GAME':
            return newState = {};
            break;
            
        case 'CHECK_OR_CHECK_MAT':
            if (movementsService.isCheck(action.nextPlayer, action.piecesPosition)) {
                newState = {
                    'status' : CHECK,
                    'color' : action.nextPlayer
                };
            }

            if (movementsService.playerIsBlocked(action.nextPlayer, action.piecesPosition)) {
                if (newState['status'] !== undefined) {
                    newState = {
                        'status' : CHECK_MAT,
                        'color' : action.nextPlayer
                    };
                }
                else {
                    newState = {
                        'status' : PAT,
                        'color' : action.nextPlayer
                    };
                }
            }
            return newState;
            break;

        default:
            return state;
    }
    return state;
};

export default checkReducer;