import React from 'react';
import Piece from '../Piece';
import blackknight from '../../images/pieces/black-knight.png';
import whiteknight from '../../images/pieces/white-knight.png';

class Knight extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whiteknight}
                black={blackknight}
            />
        );
    }
}

export default Knight;
