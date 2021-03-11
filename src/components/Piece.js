import React from 'react';

const Piece = ( props ) => {
    return (
        <div
            key={props.pieceKey}
            className={'piece ' + props.className + (props.selected ? ' square-selected' : '')}
        >
            <img src={props.image}  alt="" onClick={() => (props.onClick())} />
        </div>
    )
};

export default Piece;