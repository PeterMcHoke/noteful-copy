import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    deleteFolder: () => {}
})

export default NoteContext;
