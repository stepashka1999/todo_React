import React from 'react';

import './item-status-filter';

export default class ItemStatusFilter extends React.Component {   
    buttons = [
        {name : 'all', label: 'All'},
        {name : 'active', label: 'Active'},
        {name : 'done', label: 'Done'}
    ];

    onStatusChanged = (name) => {
        this.props.onStatusChanged(name);
    };
    
    render() {
        let { filter } = this.props;

        const buttons = this.buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const clazz = isActive ? 'btn-primary' : 'btn-outline-secondary';
        return <button key={name}
                    type="button"
                    className={`btn ${clazz}`}
                    onClick={() => this.onStatusChanged(name)}>
                {label}
                </button>
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}