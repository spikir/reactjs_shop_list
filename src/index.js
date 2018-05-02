import React from "react";
import { render } from "react-dom";

let noteId = 0;

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
      <div className="lists">
        <h1>{this.props.name}</h1>
        <div className="form">
          <input
            className="inputNote"
            type="text"
            value={this.state.inputNote}
            onChange={this.handleChange.bind(this)}
          />
          <button className="addButton" onClick={this.addNote.bind(this)}>
            Add note
          </button>
          <ul>
            <h2>
              {this.state.notes.map(c => {
                return (
                  <li>
                    {c.note}{" "}
                    <button
                      className="deleteButton"
                      onClick={this.deleteNote.bind(this, c.id)}
                    >
                      Delete note
                    </button>
                  </li>
                );
              })}
            </h2>
          </ul>
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
