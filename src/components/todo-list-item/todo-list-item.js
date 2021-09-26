import React from 'react';

import './todo-list-item.css';

export default class ToDoListItem extends React.Component {

    render() {
        const {
            label,
            onDeleted,
            onToggleImportant,
            onToggleDone,
            important,
            done
        } = this.props;

        const spanStyle = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };

        let classNames = 'todo-list-item';
        classNames += done ? ' done' : '';
    
        return (
            <span className={classNames}>
                <span   className="todo-list-item-label"
                        style={spanStyle}
                        onClick={onToggleDone}>
                    {label}
                </span>
                <button type="button" className="btn btn-outline-success btn-sm float-end" onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" aria-hidden="true" />
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm float-end" onClick={onDeleted}>
                    <i className="fa fa-trash-o" aria-hidden="true" />
                </button>
            </span>
        );
    }
};