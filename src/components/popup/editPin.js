import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';

class EditPin extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }

    createPin(e){
        e.preventDefault();

        if(this.refs.name.value && this.refs.description.value && this.refs.tags.value){
            var data = {
                file: this.refs.image.files[0],
                name: this.refs.name.value,
                description: this.refs.description.value,
                tags: this.refs.tags.value
            }
            this.props.editBoardPin(this.props.pin.boardID, this.refs.board.value, this.props.pin.pinID, this.props.pin, data);
            this.props.closePopup();
        }else{
            this.setState({error: "No fields can be empty"});
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Pin</h1>
                <hr className="stylehr"/>
                {this.state.error ? (
                    <div className="alert alert-danger"><strong>Error! </strong>{this.state.error}</div>
                ):(
                    null
                )}
                <form className="createForm" onSubmit={this.createPin.bind(this)}>
                    <input type="file" accept="image/*" className="form-control-file" id="image" ref="image"/> <br />
                    <select className="form-control" ref="board" id="dropdown" defaultValue={this.props.pin.boardID}>
                        <option value="none" disabled>--Select a Board--</option>
                        {this.props.userBoards.map((board, index) => (
                            <option value={board.boardID} key={index}>{board.name}</option>
                        ))}
                    </select><br />
                    <input type="text" className="form-control" ref="name" placeholder="Pin name" defaultValue={this.props.pin.name}/> <br />
                    <input type="text" className="form-control" ref="description" placeholder="Description" defaultValue={this.props.pin.description}/> <br />
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)" defaultValue={this.props.pin.tags}/> <br />
                    <center><button type="submit" className="btn btn-danger">Confirm Changes</button></center>
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