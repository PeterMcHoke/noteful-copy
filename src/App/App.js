import React from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NoteListMain from '../NoteListMain/NoteListMain'
import NoteViewNav from '../NoteViewNav/NoteViewNav';
import NoteViewMain from '../NoteViewMain/NoteViewMain';
import NoteContext from '../NoteContext.js';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import config from '../config';
import './App.css'

class App extends React.Component {
    state = {
        notes: [],
        folders: []
    };

    deleteNote = (noteId) => {
        this.setState( {
            notes: this.state.notes.filter( note => note.id !== noteId)
        });
    }

    deleteFolder = (folderId) => {
        this.setState( {
            folders: this.state.folders.filter( folder => folder.id !== folderId)
        });
    }

    addFolder = (newFolder) => {
        this.setState( {
            folders: [...this.state.folders,newFolder]
        })
    }

    addNote = (note) => {
        this.setState( {
            notes: [...this.state.notes, note]
        })
    }

    componentDidMount() {
          Promise.all([
              fetch(`${config.API_ENDPOINT}/notes`),
              fetch(`${config.API_ENDPOINT}/folders`)
          ])
              .then(([notesRes, foldersRes]) => {
                  if (!notesRes.ok)
                      return notesRes.json().then(e => Promise.reject(e));
                  if (!foldersRes.ok)
                      return foldersRes.json().then(e => Promise.reject(e));

                  return Promise.all([notesRes.json(), foldersRes.json()]);
              })
              .then(([notes, folders]) => {
                  this.setState({notes, folders});
              })
              .catch(error => {
                  console.error({error});
              });
      }

  renderNav() {
      return (
            <>
                <header className="AppHeader">
                  <h1> <Link to="/"> Noteful </Link></h1>
                </header>
                {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListNav}
                        />
                ))}
                <Route path="/note/:noteId" component={NoteViewNav} />
                <Route path="/add-folder" component={NoteViewNav} />
                <Route path="/add-note" component={NoteViewNav} />
            </>
        );
    }

    renderMain() {
        return (
            <>
            {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NoteViewMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        )
    }

  render() {
      const value = {
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder,
          addNote: this.addNote,
          deleteFolder: this.deleteFolder,
      }
    return (
        <div className="App">
            <NoteContext.Provider value={value}>
                <nav className="AppNav"> {this.renderNav()} </nav>
                <main className="AppMain"> {this.renderMain()} </main>
            </NoteContext.Provider>
        </div>
    )
  }

};

export default App;
