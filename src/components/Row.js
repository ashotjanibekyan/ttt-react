import React from 'react';
import Cell from './Cell'
import classes from './Row.module.css'

const row = (props) => {
    return (<div className={classes.Row}>
            {props.row.map((letter, index) => <Cell result={props.result} clicked={props.clicked} key={index}
                                                    rowN={props.rowN}
                                                    colN={index} letter={letter}/>)}
        </div>
    );
}

export default row;