import React from 'react';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Queen from './pieces/Queen';
import King from './pieces/King';
import Pawn from './pieces/Pawn';
import piecesService from '../services/PiecesService';

class Pieces extends React.Component {

    render() {
            let pieces = [];
            Object.entries(this.props.pieces).forEach((item, key) => {
                    let piece;
                    const position = item[0];
                    const nameAndColor = item[1];
                    const color = nameAndColor.substring(1, 2);
                    const name = nameAndColor.substring(0, 1);
                    switch (name) {
                            case piecesService.PAWN:
                                    piece = <Pawn
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;

                                    break;

                            case piecesService.ROOK:
                                    piece = <Rook
                                        key={item}
                                        color={color}
                                        position={position}
                                        onClick={() => (this.handleSelectPiece())}
                                        name={nameAndColor}
                                    />;
                                    break;

                            case piecesService.KNIGHT:
                                    piece = <Knight
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;
                                    break;

                            case piecesService.BISHOP:
                                    piece = <Bishop
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;
                                    break;

                            case piecesService.QUEEN:
                                    piece = <Queen
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;
                                    break;

                            case piecesService.KING:
                                    piece = <King
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;
                                    break;

                            default:
                                    piece = <Pawn
                                        key={item}
                                        color={color}
                                        position={position}
                                        name={nameAndColor}
                                    />;
                                    break;
                    }
                    pieces.push(piece);
            });


        return (
            <div className="pieces">
                {pieces}
            </div>
        );
    }
}
export default Pieces;
