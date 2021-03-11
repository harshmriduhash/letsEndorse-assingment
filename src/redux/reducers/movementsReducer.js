import movementsService from '../../services/MovementsService';
import enPassantService from '../../services/EnPassantService';

const movementsReducer = (state = [], action) => {
    let movements = [];
    switch(action.type) {
        case 'NEW_GAME':
            movements = [];
            break;
            
        case 'SELECT_PIECE':
            if (action.selectedPiece !== '') {
                 // Get the available movements for the selected piece.
                movements = movementsService.getAvailableMovement(action.selectedPiece, action.piecesPosition, action.castling);
                
                // Get the "en passant" movements for the selected piece if exists.
                movements = enPassantService.addEnPassantToMovements(action.selectedPiece, action.enPassant, movements);

                movements = movementsService.removeIllegalMovements(action.selectedPiece, action.piecesPosition, movements);
            }
            break;

        case 'UNSELECT_PIECE':
            movements = [];
            break;

        case 'MOVE_PIECE':
            movements = [];
            break;
        default:
            return state;
    }
    return movements;
};

export default movementsReducer;