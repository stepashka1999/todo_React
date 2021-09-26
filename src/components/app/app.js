import React from 'react';

import AppHeader from '../app-header';
import SearchInput from '../search-input';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {
    maxId = 0;
    state = {
        todoData: [
            this.createTodDoItem('Drink Codde'),
            this.createTodDoItem('Make awesome App'),
            this.createTodDoItem('Have a lunch')
        ],
        searchRequest: '',
        filter: 'all'// all|active|done
    };

    createTodDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex(el => el.id === id);
            todoData.splice(index, 1);

            return { todoData: [...todoData] };
        });
    };

    addItem = (label) => {
        const newItem = this.createTodDoItem(label);
        this.setState(({todoData}) => {
            const newData = [...todoData, newItem];
            
            return { todoData: newData};
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });        
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    toggleProperty(array, id, prop){
        const index = array.findIndex(el => el.id === id);
        const oldItem = array[index];
        const newItem = {...oldItem, [prop]: !oldItem[prop] };

        const newArray = [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index+1)];

        return newArray;
    };

    onSearchRequestChanged = (value) =>{
        this.setState({searchRequest: value});
    };

    onStatusChanged = (filter) => {
        this.setState({filter});
    };

    search(request, items) {
        if(request.length === 0){
            return items;
        }
        const resultItems = items.filter(el => 
            el.label.toLowerCase().includes(request.toLowerCase()));
        
        return resultItems;
    };

    filter(items, filter){
        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter(el => !el.done);  
            case'done':
                return items.filter(el => el.done);
            default:
                return items;
        }
    };

    render(){
        const { todoData, searchRequest, filter } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        let visibleItems = this.filter(todoData, filter);
        visibleItems = this.search(searchRequest, visibleItems);

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchInput onSearchRequestChanged={this.onSearchRequestChanged}/>
                    <ItemStatusFilter filter={filter} onStatusChanged={this.onStatusChanged}/>
                </div>
                <ToDoList 
                    todos={visibleItems} 
                    onDeleted={ this.deleteItem }
                    onToggleDone={ this.onToggleDone }
                    onToggleImportant={ this.onToggleImportant }    
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
}