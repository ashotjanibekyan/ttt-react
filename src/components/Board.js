import React from 'react';
import Row from './Row'
import classes from './Board.module.css'

const board = (props) => {
    return (<div className={classes.Board}>
        {props.board.map((row, index) => {
            return <Row clicked={props.clicked} key={index} rowN={index} row={row} result={props.result}/>;
        })}
    </div>);
}

export default board;