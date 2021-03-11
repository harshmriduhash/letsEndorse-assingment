import React from 'react';
import Piece from '../Piece';
import blackbishop from '../../images/pieces/black-bishop.png';
import whitebishop from '../../images/pieces/white-bishop.png';

class Bishop extends React.Component {


    render() {
        return (
            <Piece
                position={this.props.position}
                name={this.props.name}
                color={this.props.color}
                white={whitebishop}
                black={blackbishop}
            />
        );
    }
}

export default Bishop;
