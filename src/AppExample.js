import React from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListMain from '../NoteListMain/NoteListMain';
import NoteListNav from '../NoteListNav/NoteListNav';
import NoteviewMain from '../NoteViewMain/NoteViewMain';
import NoteViewNav from '../NoteViewNav/NoteViewNav';

class App extends React.Component {

renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NoteNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NoteViewNav} />
                <Route path="/add-note" component={NoteViewNav} />
            </>
        );
    }
  }

  export default App;
