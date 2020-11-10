import React from 'react';
import Note from '../Note/Note';
import './NoteViewMain.css';
import NoteContext from '../NoteContext';
import {findNote} from '../note-helpers';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

export default class NoteViewMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NoteContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const {
            notes = []
        } = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {
            content: ''
        }
        return (<section className='NoteViewMain'>
            <ErrorHandler>
                <Note id={note.id} name={note.name} modified={note.modified} deleteNote={this.handleDeleteNote} history={this.props.history} className="NoteViewMain_note"/>
                <div className='NoteViewMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) => <p key={i}>{para}</p>)}
                </div>
            </ErrorHandler>
        </section>)
    }
}
