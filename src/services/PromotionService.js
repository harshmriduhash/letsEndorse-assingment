import piecesService from './PiecesService';

class PromotionService {

    constructor() {
        
    }

        /**
     * Replace the promoted Pawn by the selected piece of the promotion.
     * 
     * @param {String} pieceName 
     *      Full name and position of the promoted pawn.
     * @param {String} pieceType 
     *      Piece type selected by the promotion interface.
     * @param {Object} piecesMap 
     *      Object containing the position of all pieces on the board.
     */
    promotion = (pieceName, pieceType, piecesMap) => {
        let newPiecesMap = Object.assign({}, piecesMap);
        const newPiece = pieceType + piecesService.getPieceColor(pieceName);
        const position = piecesService.getCurrentPosition(pieceName);
        newPiecesMap[position] = newPiece;
        return newPiecesMap;
    }

    /**
     * Get the full name and position of the promoted pawn.
     *
     * @param {Object} piecesMap 
     *      Object containing the position of all pieces on the board.
     */
    getPromotedPieceName = (piecesMap) => {
        let pieceName = '';
        for (const position in piecesMap) {
            const piece = piecesMap[position];
            if (piecesService.isPawn(piece)) {
                if (position.substr(1, 2) === '1' || position.substr(1, 2) === '8') {
                    pieceName = piecesService.getPieceName(piece, position);
                }
            }
        }
        return pieceName;
    }

    promotionIsNeeded = (selectedPiece, position) => {
        let isNeeded = false;
        if (piecesService.isPawn(selectedPiece)) {
            if (piecesService.getPieceColor(selectedPiece) === piecesService.WHITE_PIECE) {
                if (position.substring(1,2) === '8') {
                    isNeeded = true;
                }
            }
            else {
                if (position.substring(1,2) === '1') {
                    isNeeded = true;
                }
            }
        }
        return isNeeded;
    }


}
const promotionService = new PromotionService();
export default promotionService;