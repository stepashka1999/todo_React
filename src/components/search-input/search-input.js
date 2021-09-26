import React from 'react';

import './search-input.css';

export default class SearchInput extends React.Component {
    
    state = {
        searchRequest: ''
    };
    
    onChange = (e) => {
        const newRequest = e.target.value;
        this.setState({searchRequest: newRequest});

        this.props.onSearchRequestChanged(newRequest);
    };

    render() {
    return <input type="text" 
                className="search-input" 
                placeholder = 'Search'
                onChange={this.onChange} 
                value={this.state.searchRequest} 
            />
    };
};