import './App.css';
import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.onItemAdded(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="todo-input">Input text</label>
                <input type="text" id="todo-input" name="todo-input" required placeholder="Enter todo item"
                       value={this.state.value} onChange={this.handleChange} />
                <input type="submit" id="submit" value="submit" />
            </form>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.clearSelected = this.clearSelected.bind(this);
    }


    clearSelected(event) {
        event.preventDefault();

        let list = this.props.todoList;
        console.log(list);

        for (let i = list.length - 1; i >= 0; i--) {
            console.log(event.target[i].checked);
            console.log(i);
            if (event.target[i].checked) {
                list.splice(i, 1);
            }
            event.target[i].checked = false;
        }

        console.log(list);

        this.props.onClearSelected(list);
    }

    render() {
        let rows = [];
        console.log(this.props.todoList);
        let i = 0
        for (const item of this.props.todoList) {
            rows.push(<div className="todo-item">
                <input type="checkbox" className="todo-check" name={i.toString()} />
                <label className="todo-label" htmlFor={i.toString()}>{item}</label></div>);
            i++;
        }
        console.log(rows);

        return (
            <form id="todo-items" onSubmit={this.clearSelected}>
                {rows}
                <input className="clear-button" type="submit" name="clear-selected" id="clear-selected" value="Clear selected"/>
            </form>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let storageItems = localStorage.getItem("todoItems");
        console.log(storageItems);

        if (storageItems != null) {
            try {
                storageItems = JSON.parse(storageItems);
            } catch (e) {
                console.error("Invalid json!");
                storageItems = [];
            }
            this.state = {todoItems: storageItems};
        } else {
            this.state = {todoItems: []};
        }
        this.handleTodoChange = this.handleTodoChange.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
        this.handleClearSelected = this.handleClearSelected.bind(this);
    }

    handleTodoChange(item) {
        console.log(item);
        let todoItems = this.state.todoItems;
        todoItems.push(item);
        this.setState({todoItems: todoItems});
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
        console.log(this.state.todoItems);
    }

    handleClearAll() {
        this.setState({todoItems: []});
        localStorage.setItem("todoItems", []);
    }

    handleClearSelected(list) {
        this.setState({todoItems: list});
        localStorage.setItem("todoItems", list);
    }

    render() {
        return (
            <div id="App">
                <h1 id="title">TODO form</h1>
                <TodoList todoList={this.state.todoItems}
                onClearSelected={
                    this.handleClearSelected
                }/>
                <button className="clear-button" id="clear-all" onClick={this.handleClearAll}>Clear all</button>
                <TodoForm onItemAdded={
                    this.handleTodoChange
                }/>
            </div>
        );
    }
}



export default App;
