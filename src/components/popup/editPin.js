import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';

class EditPin extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }

    editPin(e){
        e.preventDefault();

        if(this.refs.name.value && this.refs.description.value && this.refs.tags.value){
            if(this.refs.name.value.trim().length <= 18){
                var data = {
                    name: this.refs.name.value.trim(),
                    description: this.refs.description.value.trim(),
                    tags: this.refs.tags.value
                }
                
                this.props.editBoardPin(this.props.pin.boardID, this.refs.board.value, this.props.pin.pinID, this.props.pin, data);
                this.props.closePopup();
            }else{
                this.setState({error: "Name cannot be more than 18 characters."});
            }
        }else{
            this.setState({error: "No fields can be empty"});
        }
    }

    deletePin(){
        var confirmation = confirm("Are you sure you want to remove this pin?");
        if (confirmation) {
            this.props.deleteBoardPin(this.props.user.username, this.props.pin.boardID, this.props.pin.pinID, this.props.pin.createdBy);
            this.props.closePopup();
        }
    }


    render() {
        var newArray = [];
        for ( var i = 0; i < this.props.userBoards.length; i++) {
            if (this.props.userBoards[i].createdBy === this.props.user.username) {
                newArray = newArray.concat(this.props.userBoards[i]);
            }
        }
        return (
            <div className="editPop">
                <h1>Edit Pin</h1>
                <hr className="stylehr"/>
                {this.state.error ? (
                    <div className="alert alert-danger"><strong>Error! </strong>{this.state.error}</div>
                ):(
                    null
                )}
                <form className="createForm" onSubmit={this.editPin.bind(this)} onReset={this.deletePin.bind(this)}>
                    <label>Pin Name:</label>
                    <input type="text" className="form-control" ref="name" placeholder="Pin name" defaultValue={this.props.pin.name}/> <br />
                    <label>Board:</label>
                    <select className="form-control dropdown" ref="board" defaultValue={this.props.pin.boardID}>
                        <option value="none" disabled>--Select a Board--</option>
                        {newArray.map((board, index) => (
                            <option value={board.boardID} key={index}>{board.name}</option>
                        ))}
                    </select><br />
                    <label>Description:</label>
                    <input type="text" className="form-control" ref="description" placeholder="Description" defaultValue={this.props.pin.description}/> <br />
                    <label>Tag:</label>
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)" defaultValue={this.props.pin.tags}/> <br />
                    <button type="reset" className="btn btn-danger">Delete</button>
                    <button type="submit" className="btn btn-default confirmChangeButton">Confirm Changes</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userBoards: state.userBoards,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(EditPin)