
const pawnPromotionReducer = (state = 0, action) => {
    let newState = state;
    switch(action.type) {
        case 'NEW_GAME':
            newState = 0;
            break;

        case 'ACTIVE_PAWN_PROMOTION':
            newState = 1;
            break;

        case 'DISABLE_PAWN_PROMOTION':
            newState = 0;
            break;
        default:
    }
    return newState;
};

export default pawnPromotionReducer;