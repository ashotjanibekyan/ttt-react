import React from 'react';
import classes from './Cell.module.css'

const cell = (props) => {
    const cls = [classes.Col]
    if ((props.result[3] === -1 && props.rowN === props.colN)
        || (props.result[3] === 1 && props.rowN + props.colN === 2)
        || props.rowN === props.result[1]
        || props.colN === props.result[2]) {
        cls.push(classes.Red)
    }
    return (
        <span onClick={(e) => props.clicked(e, props.rowN, props.colN)}
              className={cls.join(' ')}>{props.letter}</span>);
}
export default cell;