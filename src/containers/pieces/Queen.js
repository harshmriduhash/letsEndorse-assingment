import React from 'react';
import Piece from '../Piece';
import blackqueen from '../../images/pieces/black-queen.png';
import whitequeen from '../../images/pieces/white-queen.png';

class Queen extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whitequeen}
                black={blackqueen}
            />
        );
    }
}

export default Queen;
