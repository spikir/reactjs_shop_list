import React from "react";

import { render } from "react-dom";

let noteId = 0;
let locked = false;
let i = 0;

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

const ToDo = ({
  typeView,
  todo,
  keyId,
  dbClick,
  stateChange,
  stateEditToDo,
  editKey,
  remove,
  isChecked,
  updateCheckbox
}) => {
  if (typeView === "label" || locked === true) {
    return (
      <li className="list-group-item clearfix">
        <label className="btn col-md-1 col-sm-1">
          <input
            type="checkbox"
            onChange={() => {
              updateCheckbox(keyId);
            }}
            checked={isChecked}
          />
        </label>
        <label
          key={keyId}
          onDoubleClick={() => {
            dbClick(keyId);
          }}
          className="btn"
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
    locked = true;
    return (
      <li className="list-group-item clearfix form-inline">
        <label className="col-md-1 col-sm-1 btn">
          <input
            type="checkbox"
            onChange={() => {
              updateCheckbox(keyId);
            }}
            checked={isChecked}
          />
        </label>
        <label className="col-md-11 col-sm-11">
          <input
            type="text"
            value={stateEditToDo}
            className="form-control"
            onKeyDown={event => {
              editKey(keyId, event);
            }}
            onChange={stateChange}
          />
        </label>
      </li>
    );
  }
};

const ToDoList = ({
  todos,
  dbClick,
  stateChange,
  stateEditToDo,
  editKey,
  remove,
  isChecked,
  updateCheckbox
}) => {
  const todoNote = todos.map(c => {
    return (
      <ToDo
        typeView={c.typeView}
        todo={c.note}
        keyId={c.id}
        dbClick={dbClick}
        stateChange={stateChange}
        stateEditToDo={stateEditToDo}
        editKey={editKey}
        remove={remove}
        isChecked={c.isChecked}
        updateCheckbox={updateCheckbox}
      />
    );
  });
  return (
    <div className="col-md-12 col-sm-12">
      <ul className="list-group">{todoNote}</ul>
    </div>
  );
};

const ItemsLeft = ({ items }) => {
  i = items.length;
  items.map(c => {
    if (c.isChecked === true) {
      return i--;
    }
  });
  return <div> {i} items left</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      inputNote: "",
      inputField: "",
      isChecked: false
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
            dbClick={this.onDoubleClick.bind(this)}
            stateChange={this.handleEditChange.bind(this)}
            stateEditToDo={this.state.inputField}
            editKey={this.handleKeyPress.bind(this)}
            remove={this.deleteNote.bind(this)}
            updateCheckbox={this.updateCheckbox.bind(this)}
          />
        </div>
        <div className="row">
          <ItemsLeft items={this.state.notes} />
        </div>
      </div>
    );
  }

  updateCheckbox(e) {
    if (locked === false) {
      const index = this.state.notes.findIndex(el => el.id === e);
      let states = this.state.notes;
      let state = states[index];
      state.isChecked = !state.isChecked;
      states[index] = state;
      this.setState({ states });
    }
  }

  handleChange(e) {
    this.setState({ inputNote: e.target.value });
  }

  handleEditChange(e) {
    locked = false;
    this.setState({ inputField: e.target.value });
  }

  onDoubleClick(e) {
    if (locked === false) {
      const index = this.state.notes.findIndex(el => el.id === e);
      let states = this.state.notes;
      let state = states[index];
      state.typeView = "input";
      states[index] = state;
      this.setState({ inputField: state.note });
      this.setState({ states });
    }
  }

  handleKeyPress(keyId, e) {
    if (e.key === "Enter" && this.state.inputField !== "") {
      const state = this.state.notes.find(el => el.id === keyId);
      state.typeView = "label";
      state.note = this.state.inputField;
      locked = false;
      this.setState({ state });
    }
  }

  addNote() {
    if (this.state.inputNote !== "") {
      noteId++;
      this.setState({
        notes: [
          ...this.state.notes,
          {
            id: noteId,
            note: this.state.inputNote,
            typeView: "label",
            isChecked: false
          }
        ]
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
