import React from 'react';

const modes = (props) => {
    const modes = [
        ['two', 'Two players'],
        ['withAI', 'You vs AI'],
        ['AIwithAI', 'AI vs AI']
    ];
    return (
        <div onChange={props.change}>
            {modes.map(el => {
                return (<React.Fragment key={el[0]}>
                        <label htmlFor={el[0]}>
                            <input defaultChecked={props.mode === el[0]} id={el[0]} value={el[0]} name="mode"
                                   type="radio"/>
                            {el[1]}
                        </label>
                    </React.Fragment>
                )
            })}
        </div>
    )
};

export default modes;