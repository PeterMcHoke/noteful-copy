import React from 'react';
import NoteContext from '../NoteContext'
import './AddFolder.css'
import cfg from '../config.js'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'

function addFolderAPI(folder) {
    return fetch(`${cfg.API_ENDPOINT}/folders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(folder)
    }).then(r => r.json())
}

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName: {
                value: '',
                touched: false
            },
            submitButtonClick: {
                touched: false
            }
        }
    }

    static contextType = NoteContext;

    updateName(name) {
        this.setState({
            folderName: {
                value: name,
                touched: true
            }
        });
    }

    submitButtonClick() {
        this.setState({
            submitButtonClick: {
                touched: true
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitButtonClick();
        const {folderName} = this.state;
        addFolderAPI({name: folderName.value}).then(folder => {
            console.log(folder);
            this.context.addFolder(folder);
            this.props.history.push('/');
        })
    }

    validateName() {
        const name = this.state.folderName.value.trim();
        if (name.length === 0) {
            return 'Mmm, I think you forgot to give your note a name 😅';
        }
    }

    render() {
        return (<ErrorHandler>
            <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
                <h2 className="AddFolder_header">Create A New Folder</h2>
                <div className="form-group">
                    {(this.state.folderName.touched || this.state.submitButtonClick.touched) && <ValidationError message={this.validateName()}/>}
                    <label htmlFor="name">Name
                    </label>
                    <input type="text" className="addFolder__control" aria-label="FolderName" aria-required="true" name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
                </div>
                <div className="registration__button__group">
                    <button type="reset" className="registration__button" id="cancel" aria-label="Cancel" onClick={() => this.props.history.goBack()}>
                        Cancel
                    </button>
                    <button type="submit" className="registration__button" aria-label="Save" disabled={this.validateName()} onClick={() => this.submitButtonClick()}>
                        Save
                    </button>
                </div>
            </form>
        </ErrorHandler>)
    }
}

AddFolder.propTypes = {
    history: PropTypes.shape({push: PropTypes.func.isRequired, goBack: PropTypes.func.isRequired}).isRequired
}
