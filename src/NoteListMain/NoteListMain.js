import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../NoteContext';
import './NoteListMain.css'
import {getNotesForFolder} from '../note-helpers.js';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import PropTypes from 'prop-types';



export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NoteContext;

    render() {
        const { notes =[] } = this.context;
        console.log()
        const { folderId } = this.props.match.params;
        const folder = this.context.folders.find( folder => folder.id === folderId);
        const notesForFolder = getNotesForFolder(notes, folderId)
        function getFolderName() {
            if (folder) {
                return folder.name
            }
            else {
                return "All Notes"
            }
        }
      return (
        <section className='NoteListMain'>
            <h2 className='NoteListMain_folder-name'> {  getFolderName() }</h2>
          <ul>
          <ErrorHandler>
            {notesForFolder.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
                <hr />
              </li>
            )}
            </ErrorHandler>
          </ul>
          { notesForFolder.length === 0 && <><hr /> <h3> No notes yet </h3></>}
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
              aria-label="Add-Note"
            >
              <br />
              Add Note
            </CircleButton>
          </div>
        </section>
      )
}
}

NoteListMain.propTypes = {
    match: PropTypes.isRequired
}
