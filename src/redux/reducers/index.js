import { combineReducers } from 'redux';
import pieceReducer from './pieceReducer';
import piecesPositionReducer from './piecesPositionReducer';
import movementsReducer from './movementsReducer';
import castlingReducer from './castlingReducer';
import playerReducer from './playerReducer';
import pawnPromotionReducer from './pawnPromotionReducer';
import enPassantReducer from './enPassantReducer';
import checkReducer from './checkReducer';
import configurationReducer from './configurationReducer';
import historyReducer from './historyReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const chessReducers = combineReducers({
  history: historyReducer,
  form: reduxFormReducer,
  configuration: configurationReducer,
  pawnPromotion: pawnPromotionReducer,
  selectedPiece: pieceReducer,
  castling: castlingReducer,
  enPassant: enPassantReducer,
  availableMovements: movementsReducer,
  piecesPosition: piecesPositionReducer,
  checkOrCheckMat: checkReducer,
  nextPlayer: playerReducer,
});

export default chessReducers;