import piecesService from './PiecesService';

class HistoryService {

    constructor(historyStore) {
      this.history = historyStore;
    }

    getLastMove = () => {
        let lastMove = [];
        if (this.history.length > 0) {
            const lastHistory = this.history[this.history.length -1 ];
            lastMove.push(piecesService.getCurrentPosition(lastHistory.selectedPiece));
            lastMove.push(lastHistory.toPosition);
        }
        return lastMove;
    }
}
export default History = HistoryService;