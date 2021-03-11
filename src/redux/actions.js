export const selectPieceAction = (selectedPiece) => (
  (dispatch, getState) => {
    dispatch({
      type: 'SELECT_PIECE',
      selectedPiece: selectedPiece,
      piecesPosition: getState().piecesPosition,
      castling: getState().castling,
      enPassant: getState().enPassant
    });
  }
 );

 export const unselectPieceAction = () => ({
  type: 'UNSELECT_PIECE'
});

export const movePieceAction = (selectedPiece, toPosition) => (
  (dispatch, getState) => {
    dispatch({
      type: 'MOVE_PIECE',
      selectedPiece: selectedPiece,
      toPosition: toPosition,
      availableMovements: getState().availableMovements,
      piecesPosition: getState().piecesPosition
    });

    dispatch({
      type: 'CHECK_OR_CHECK_MAT',
      piecesPosition: getState().piecesPosition,
      nextPlayer: getState().nextPlayer
    });

    if (getState().checkOrCheckMat['status'] === 'check mat') {
        dispatch({
          type: 'END_GAME'
        });
    }
  });

export const activePawnPromotionAction = () => ({
  type: 'ACTIVE_PAWN_PROMOTION'
});

export const disablePawnPromotionAction = () => ({
  type: 'DISABLE_PAWN_PROMOTION'
});

export const pawnPromotionReplaceAction = (pieceName, pieceType) => ({
  type: 'PAWN_PROMOTION_REPLACE', 
  pieceName: pieceName,
  pieceType: pieceType
});

export const newGameAction = (values) => ({
  type: 'NEW_GAME',
  values: values
});

export const restartGameAction = () => ({
  type: 'START_INTRO'
});

export const pendingGameAction = () => ({
  type: 'PENDING_GAME'
});

export const continueGameAction = (values) => ({
  type: 'CONTINUE_GAME',
  values: values
});

export const endGameAction = () => ({
  type: 'END_GAME'
});
