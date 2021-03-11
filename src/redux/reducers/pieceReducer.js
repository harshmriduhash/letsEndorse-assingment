

const pieceReducer = (state = '', action) => {
    let newSelectedPiece = state;
    switch(action.type) {
        case 'NEW_GAME':
            newSelectedPiece = '';
            break;

        case 'SELECT_PIECE':
            if (action.selectedPiece !== state) {
                newSelectedPiece = action.selectedPiece;
            }
            break;

        case 'UNSELECT_PIECE':
            newSelectedPiece = '';
            break;

        case 'MOVE_PIECE':
            newSelectedPiece = '';
            break;

        default:
            newSelectedPiece = state;
    }
    return newSelectedPiece;
};


export default pieceReducer;