import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import './NoteListNav.css'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../NoteContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {countNotesForFolder} from '../note-helpers';
import ErrorHandler from '../ErrorHandler/ErrorHandler'


export default class NoteListNav extends React.Component {
    static contextType = NoteContext;

    render() {
        const {
            folders = [],
            notes = []
        } = this.context;
        return (
        <ErrorHandler>
        <div className='NoteListNav'>
            <ul className='NoteListNav__list'>
                {
                    folders.map(folder => <li key={folder.id}>
                        <NavLink className='NoteListNav__folder-link' to={`/folder/${folder.id}`}>
                            <span className='NoteListNav__num-notes'>
                                {countNotesForFolder(notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>)
                }
            </ul>
            <div className='NoteListNav__button-wrapper'>
                <CircleButton tag={Link} to='/add-folder' type='button' className='NoteListNav__add-folder-button' aria-label="Add-Folder">
                    <FontAwesomeIcon icon='fa-plus'/>
                    <br/>
                    Add Folder
                </CircleButton>
            </div>
        </div>
        </ErrorHandler>
        )
    }
}
