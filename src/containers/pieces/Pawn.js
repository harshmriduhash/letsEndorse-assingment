import React from 'react';
import Piece from '../Piece';
import blackpawn from '../../images/pieces/black-pawn.png';
import whitepawn from '../../images/pieces/white-pawn.png';

class Pawn extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whitepawn}
                black={blackpawn}
            />
        );
    }
}

export default Pawn;
