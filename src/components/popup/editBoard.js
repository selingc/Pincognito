import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class CreateBoard extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }

    editBoard(e){
        e.preventDefault();

        if(this.refs.name.value && this.refs.description.value && this.refs.tags.value){
            if(this.refs.name.value.trim().length <= 18){
                var data = {
                    name: this.refs.name.value.trim(),
                    description: this.refs.description.value.trim(),
                    tags: this.refs.tags.value
                }

                this.props.editUserBoard(this.props.user.username, this.props.board.boardID, this.props.board, data);
                this.props.closePopup();
            }else{
                this.setState({error: "Name cannot be more than 18 characters."});
            }
        }else{
            this.setState({error: "No fields can be empty"});
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Board</h1>
                <hr className="stylehr"/>
                {this.state.error ? (
                    <div className="alert alert-danger"><strong>Error! </strong>{this.state.error}</div>
                ):(
                    null
                )}
                <form className="createForm" onSubmit={this.editBoard.bind(this)}>
                    <label for="name">Board Name:</label>
                    <input type="text" className="form-control" ref="name" placeholder="Board name" defaultValue={this.props.board.name}/> <br />
                    <label for="description">Description:</label>
                    <input type="text" className="form-control" ref="description" placeholder="Description" defaultValue={this.props.board.description}/> <br />
                    <label for="tags">Tag:</label>
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)" defaultValue={this.props.board.tags}/> <br />
                    <center><button type="submit" className="btn btn-danger">Create Board</button></center>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(CreateBoard);

