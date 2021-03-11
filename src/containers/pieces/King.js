import React from 'react';
import Piece from '../Piece';
import blackking from '../../images/pieces/black-king.png';
import whiteking from '../../images/pieces/white-king.png';

class King extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whiteking}
                black={blackking}
            />
        );
    }
}

export default King;
