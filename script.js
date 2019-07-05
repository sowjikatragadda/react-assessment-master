import React, {Component} from 'react';

function toggleCheckbox(index) {
    const {checkboxes} = this.state;

    checkboxes[index].checked = !checkboxes[index].checked;

    this.setState({
        checkboxes,
        unchecked: this.state.checkboxes.filter(checkbox => checkbox.checked === false).length
    });
}

function deleteToDo(arrayindex) {
    var {checkboxes} = this.state;
    this.setState({
        checkboxes: checkboxes.filter((item, index) => index !== arrayindex),
        unchecked: checkboxes.filter((item, index) => index !== arrayindex && item.checked === false).length
    });
}

function renderCheckboxes() {
    const {checkboxes} = this.state;
    console.log(checkboxes);
    return (
        <ul id="todo-list ul" className="todo-list">
            {checkboxes.map((checkbox, index) =>
                <li className="todo-container">
                    <label>
                        <input className="todo-checkbox"
                               type="checkbox"
                               checked={checkbox.checked}
                               onChange={toggleCheckbox.bind(this, index)}
                        />
                        {checkbox.label}
                    </label>
                    <button className="todo-delete" onClick={deleteToDo.bind(this, index)}>Delete</button>
                </li>
            )}
        </ul>
    );
}


class ToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxes: [],
            unchecked: 0
        };
        this.newTodo = this.newTodo.bind(this);
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
                    {renderCheckboxes.call(this)}
                </div>
            </div>
        );
    }
}

export default ToDo;