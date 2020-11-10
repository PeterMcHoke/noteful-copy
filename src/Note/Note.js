import React from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NoteContext from '../NoteContext';
import './Note.css';
import API_ENDPOINT from '../config'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import PropTypes from 'prop-types'

function deleteNoteAPI(noteId) {
    return fetch(`${API_ENDPOINT}/notes/${noteId}`, {method: 'DELETE'})
}
export default class Note extends React.Component {
    static contextType = NoteContext;
    handleClickDelete = e => {
        deleteNoteAPI(this.props.id).then(() => this.context.deleteNote(this.props.id)).then(this.props.deleteNote);
    }
    render() {
        return (<div className='Note'>
            <h2 className='Note__title'>
                <Link to={`/note/${this.props.id}`}>
                    {this.props.name}
                </Link>
            </h2>
            <button className='Note__delete' type='button' aria-label="Delete" onClick={this.handleClickDelete}>
                <FontAwesomeIcon icon='trash-alt'/>
            </button>
            <ErrorHandler>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                        <span className='Date'>
                            {format(this.props.modified, 'Do MMM YYYY')}
                        </span>
                    </div>
                </div>
            </ErrorHandler>
        </div>)
    }
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.instanceOf(Date).isRequired,
    deleteNote: PropTypes.func.isRequired
}
