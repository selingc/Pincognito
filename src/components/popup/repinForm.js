import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';

class Repin extends Component {
    constructor(props){
        super(props);
        this.state = {error: ""};
    }

    repinToBoard(e){
        e.preventDefault();

        if(this.refs.board.value !== "none"){
            this.props.repinToBoard(this.props.user.username, this.refs.board.value, this.props.pin.pinID);
            this.props.closePopup();
        }
    }

    render() {
        return (
            <div>
                <h1>Add Pin</h1>
                <hr className="stylehr"/>
                {this.state.error ? (
                    <div className="alert alert-danger"><strong>Error! </strong>{this.state.error}</div>
                ):(
                    null
                )}
                <form className="createForm" onSubmit={this.repinToBoard.bind(this)}>

                    <select className="form-control" ref="board" id="dropdown" defaultValue="none">
                        <option value="none" disabled>--Select a Board--</option>
                        {this.props.userBoards.map((board, index) => (
                            <option value={board.boardID} key={index}>{board.name}</option>
                        ))}
                    </select><br />
                 
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

export default connect(mapStateToProps, actions)(Repin)