import React from 'react';
import Square from '../components/Square';
import { movePieceAction, activePawnPromotionAction } from '../redux/actions';
import { connect } from 'react-redux';
import promotionService from '../services/PromotionService';
import piecesService from '../services/PiecesService';

class Board extends React.Component {

    handleMove(position) {
        if (this.props.selectedPiece !== '' && this.props.availableMovements.indexOf(position) !== -1) {
            // In case of Pawn, manage the promotion.
            if (promotionService.promotionIsNeeded(this.props.selectedPiece, position)) {
                this.props.launchPawnPromotion();
            }
            this.props.move(this.props.selectedPiece, position);
            
        }
    }

    getSquareRef = (letter, number) => {
        return letter + number;
    }

    getBackground = (letter, number, reverse, inverseResult = false) => {
        const position = this.getSquareRef(letter, number);
        let isDark = false;
        let className;
        if (reverse) {
            if (number%2 !== 0) {
                isDark = true;
            }
        }
        else {
            if (number%2 === 0) {
                isDark = true;
            }
        }

        if (isDark) {
            className = 'dark '+this.props.configuration.color;
            if (inverseResult) {
                className = 'light';
            }
        }
        else {
            className = 'light';
            if (inverseResult) {
                className = 'dark '+this.props.configuration.color;
            }
        }

        if (this.props.lastMove.indexOf(position) !== -1) {
            className = className + ' last-move';
        }
        return className;
    }

    showDot = (letter, number) => {
        let showDot = false;
        if (this.props.configuration['helpmove']) {
            if (this.props.availableMovements.indexOf(letter + number) !== -1 ) {
                showDot = true;
            }
        }
        return showDot;
    }

    render() {
        let numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let reverse = false;
        if (this.props.configuration.autoflip && this.props.nextPlayer === piecesService.BLACK_PIECE) {
            reverse = true;
            numbers = numbers.reverse();
            letters = letters.reverse();
        }
        const squares = numbers.map((number, index) => (
            <div key={'row'+number} className={"board-row row-" + number} >
                <Square 
                    key={letters[0] + number} 
                    cell={letters[0] + number} 
                    background={this.getBackground(letters[0], number, reverse)} 
                    onClick={() => (this.handleMove(letters[0] + number))}
                    showDot={this.showDot(letters[0], number)}
                />
                <Square 
                    key={letters[1] + number}  
                    cell={letters[1] + number} 
                    background={this.getBackground(letters[1], number, reverse, true)} 
                    onClick={() => (this.handleMove(letters[1] + number))}
                    showDot={this.showDot(letters[1], number)}
                    />
                <Square 
                    key={letters[2] + number}  
                    cell={letters[2] + number} 
                    background={this.getBackground(letters[2], number, reverse)} 
                    onClick={() => (this.handleMove(letters[2] + number))}
                    showDot={this.showDot(letters[2], number)}
                    />
                <Square 
                    key={letters[3] + number}  
                    cell={letters[3] + number} 
                    background={this.getBackground(letters[3], number, reverse, true)} 
                    onClick={() => (this.handleMove(letters[3] + number))}
                    showDot={this.showDot(letters[3], number)}
                    />
                <Square 
                    key={letters[4] + number}  
                    cell={letters[4] + number} 
                    background={this.getBackground(letters[4], number, reverse)} 
                    onClick={() => (this.handleMove(letters[4] + number))}
                    showDot={this.showDot(letters[4], number)}
                    />
                <Square 
                    key={letters[5] + number}  
                    cell={letters[5] + number} 
                    background={this.getBackground(letters[5], number, reverse, true)} 
                    onClick={() => (this.handleMove(letters[5] + number))}
                    showDot={this.showDot(letters[5], number)}
                    />
                <Square 
                    key={letters[6] + number}  
                    cell={letters[6] + number} 
                    background={this.getBackground(letters[6], number, reverse)} 
                    onClick={() => (this.handleMove(letters[6] + number))}
                    showDot={this.showDot(letters[6], number)}
                    />
                <Square 
                    key={letters[7] + number}  
                    cell={letters[7] + number} 
                    background={this.getBackground(letters[7], number, reverse, true)} 
                    onClick={() => (this.handleMove(letters[7] + number))}
                    showDot={this.showDot(letters[7], number)}
                    />
            </div>
        ));

        return (
            <div className="board-squares" >
                { squares }
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        selectedPiece: state.selectedPiece,
        availableMovements: state.availableMovements,
        configuration: state.configuration,
        nextPlayer: state.nextPlayer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        move: (selectedPiece, toPosition) => {
            dispatch(movePieceAction(selectedPiece, toPosition));
        },
        launchPawnPromotion: () => {
            dispatch(activePawnPromotionAction());
        },
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Board);
