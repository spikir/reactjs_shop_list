import React from "react";
import { render } from "react-dom";

let noteId = 0;

const ToDoForm = ({ addToDo, state, changeToDo }) => {
  return (
    <div className="row">
      <div className="col-md-10 col-sm-10">
        <input
          className="form-control"
          type="text"
          value={state}
          onChange={changeToDo}
        />
      </div>
      <div className="col-md-2 col-sm-2">
        <button
          type="button"
          className="btn btn-default btn-xl btn-block"
          id="addButton"
          onClick={() => {
            addToDo();
          }}
        >
          Add note
        </button>
      </div>
    </div>
  );
};

const ToDo = ({ todo, keyId, remove }) => {
  return (
    <li className="list-group-item clearfix">
      {todo}
      <button
        type="button"
        className="btn pull-right"
        onClick={() => {
          remove(keyId);
        }}
      >
        Delete note
      </button>
    </li>
  );
};

const ToDoList = ({ todos, remove }) => {
  const todoNote = todos.map(c => {
    return <ToDo todo={c.note} keyId={c.id} remove={remove} />;
  });
  return <ul className="list-group">{todoNote}</ul>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      inputNote: ""
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-center">{this.props.name}</h1>

        <ToDoForm
          addToDo={this.addNote.bind(this)}
          stateToDo={this.state.inputNote}
          changeToDo={this.handleChange.bind(this)}
        />
        <div className="row">
          <ToDoList
            todos={this.state.notes}
            remove={this.deleteNote.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ inputNote: e.target.value });
  }

  addNote() {
    if (this.state.inputNote !== "") {
      noteId++;
      this.setState({
        notes: [...this.state.notes, { id: noteId, note: this.state.inputNote }]
      });
    }
  }

  deleteNote(e) {
    this.setState({
      notes: this.state.notes.filter(el => el.id !== e)
    });
  }
}

render(<App name="List" />, document.getElementById("root"));
