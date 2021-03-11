
const STATUS_INTRO = 'intro';
const STATUS_GAME = 'game';
const STATUS_PENDING = 'pending';
const STATUS_OUTRO = 'outro';

const initConf = {
    autoflip: false,
    color: 'green',
    helpmove: false,
    status: STATUS_INTRO
};

const configurationReducer = (state = initConf, action) => {
    let newState = {};
    switch(action.type) {
        case 'NEW_GAME':
            newState = {
                color: action.values.color,
                autoflip: action.values.autoflip,
                helpmove: action.values.helpmove,
                status: STATUS_GAME
            };
            return newState;
            break;
        
        case 'PENDING_GAME':
            newState = Object.assign({}, state, {status: STATUS_PENDING});
            return newState;
            break;
        
        case 'CONTINUE_GAME':
            if (action.values.color === undefined) {
                newState = Object.assign({}, state, {
                    status: STATUS_GAME
                });
            }
            else {
                newState = Object.assign({}, state, {
                    status: STATUS_GAME,
                    color: action.values.color,
                    autoflip: action.values.autoflip,
                    helpmove: action.values.helpmove,
                });
            }
            return newState;
            break;

        case 'END_GAME':
            newState = Object.assign({}, state, {status: STATUS_OUTRO});
            return newState;
            break;

        case 'START_INTRO':
            newState = Object.assign({}, state, {status: STATUS_INTRO});
            return newState;
            break;

        default:
            return state;
    }
    return state;
};

export default configurationReducer;