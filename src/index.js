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

const ToDo = ({ typeElem, todo, keyId, dbClick, remove, props }) => {
  if (typeElem === "label") {
    return (
      <li className="list-group-item clearfix">
        <label
          key={keyId}
          onDoubleClick={() => {
            dbClick(keyId);
          }}
          className={"test2"}
        >
          {todo}
        </label>
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
  } else {
    return (
      <li className="list-group-item clearfix">
        <input type="text" value={todo} />
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
  }
};

const test = () => {};

const ToDoList = ({ typeElem, todos, dbClick, remove, props }) => {
  const todoNote = todos.map(c => {
    return (
      <ToDo
        typeElem={typeElem}
        todo={c.note}
        keyId={c.id}
        dbClick={dbClick}
        remove={remove}
        props={props}
      />
    );
  });
  return <ul className="list-group">{todoNote}</ul>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      inputNote: "",
      inputField: "label"
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
            typeElem={this.state.inputField}
            todos={this.state.notes}
            dbClick={this.onDoubleClick.bind(this)}
            remove={this.deleteNote.bind(this)}
            props={this.props}
          />
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ inputNote: e.target.value });
  }

  onDoubleClick(e) {
    const index = this.state.notes.findIndex(el => el.id === e);
    let states = this.state.notes;
    let state = states[index];
    state.note = this.state.inputNote;
    states[index] = state;
    this.setState({ states });
    this.setState({
      inputField: "input"
    });
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

render(<App name="List" className="test" />, document.getElementById("root"));
