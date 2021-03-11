import React from 'react';
import Piece from '../Piece';
import blackrook from '../../images/pieces/black-rook.png';
import whiterook from '../../images/pieces/white-rook.png';

class Rook extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whiterook}
                black={blackrook}
            />
        );
    }
}

export default Rook;
