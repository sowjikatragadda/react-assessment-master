import React, {Component} from 'react';

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: [],
            unchecked: 0
        };
        this.newTodo = this.newTodo.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
    }

    toggleCheckbox(index) {
        const {checkboxes} = this.state;
        checkboxes[index].checked = !checkboxes[index].checked;
        this.setState({
            checkboxes,
            unchecked: this.state.checkboxes.filter(checkbox => checkbox.checked === false).length
        });
    }


    deleteToDo(arrayIndex) {
        let {checkboxes} = this.state;
        this.setState({
            checkboxes: checkboxes.filter((item, index) => index !== arrayIndex),
            unchecked: checkboxes.filter((item, index) => index !== arrayIndex && item.checked === false).length
        });
    }


    renderCheckboxes() {
        const {checkboxes} = this.state;
        return (
            <ul id="todo-list ul" className="todo-list">
                {checkboxes.map((checkbox, index) =>
                    <li key={index} className="todo-container">
                        <label>
                            <input className="todo-checkbox"
                                   type="checkbox"
                                   checked={checkbox.checked}
                                   onChange={()=>this.toggleCheckbox(index)}
                            />
                            {checkbox.label}
                        </label>
                        <button className="todo-delete" onClick={()=> this.deleteToDo(index)}>Delete</button>
                    </li>
                )}
            </ul>
        );
    }

    newTodo() {
        const {checkboxes} = this.state,
            label = this.refs.label.value;

        checkboxes.push({
            checked: false,
            label
        });
        this.refs.label.value = '';

        this.setState({
            checkboxes,
            unchecked: checkboxes.filter(checkbox => !checkbox.checked).length
        });

    }

    render() {
        return (
            <div className="container center">
                <h1 className="center title">My TODO App</h1>
                <div className="flow-right controls">
                    <span>Item count: <span id="item-count">{this.state.checkboxes.length}</span></span>
                    <span>Unchecked count: <span id="unchecked-count">{this.state.unchecked}</span></span>
                </div>
                <div className="center">
                    <input ref="label" type="text"/>
                    <button className="button center todo-delete" onClick={this.newTodo}>New TODO</button>
                </div>
                {this.state.checkboxes.length > 0 ? <h3 className="center">TODO List</h3> : null}

                <div>
                    {this.renderCheckboxes()}
                </div>
            </div>
        );
    }
}

export default ToDo;