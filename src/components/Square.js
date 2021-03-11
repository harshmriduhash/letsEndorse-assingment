import React from 'react';

const Square = ( props ) => {
    return (
        <div 
            id={props.cell} 
            className={'square ' + props.background} 
            onClick={() => (props.onClick())}
        >
            <div className={props.showDot ? 'dot' : 'hidden' }></div>
            <div className="square-label">{props.cell}</div>
        </div>
    )
};
export default Square;