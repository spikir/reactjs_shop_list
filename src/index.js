import React from 'react';
import { render } from 'react-dom';

let noteId = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      inputNote: ""
    }

  }

  render() {
    return <div>
        <h1>{this.props.name}</h1>
        <input type="text" value={this.state.inputNote} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.addNote.bind(this)}>Add note</button>
        <ul>
          <h2>{this.state.notes.map(c => { return <li> {c.id} {c.note} </li> })}</h2>
        </ul>
      </div>
  }

  handleChange(e) {
    this.setState({ inputNote: e.target.value });
  }

  addNote(note) {
    noteId++;
    this.setState({
      notes: [...this.state.notes, { id: noteId, note: this.state.inputNote }]
    });
    
  }
}



render(<App name="List" />, document.getElementById('root'));
