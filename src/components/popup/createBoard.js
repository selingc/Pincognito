import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class CreateBoard extends Component {
    createBoard(e){
        e.preventDefault();

        var data = {
            name: this.refs.name.value,
            description: this.refs.description.value,
            tags: this.refs.tags.value
        }

        this.props.createUserBoard(this.props.username, data);
        this.refs.name.value = "";
        this.refs.description.value = "";
        this.refs.tags.value = "";

        this.props.closePopup();
    }

    render() {
        return (
            <div>
                 <h1>Create Board</h1>
                    <hr className="stylehr"/>
                    <form className="form" onSubmit={this.createBoard.bind(this)}>
                        <input type="text" className="form-control" ref="name" placeholder="Board name"/> <br />
                        <input type="text" className="form-control" ref="description" placeholder="Description"/> <br />
                        <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)"/> <br />
                        <button type="submit" className="btn btn-danger">Create Board</button>
                    </form>
            </div>
        );
    }
}

export default connect(null, actions)(CreateBoard);

