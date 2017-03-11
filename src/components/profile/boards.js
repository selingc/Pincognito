import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class Boards extends Component {
    componentWillMount(){
        this.props.fetchUserBoards();
    }

    createBoard(e){
        e.preventDefault();

        var data = {
            name: this.refs.BoardName.value,
            description: this.refs.BoardDescription.value,
            tags: this.refs.BoardTags.value
        }

        console.log(data);
        this.props.createUserBoard(data);
    }

    componentWillUnmount(){
        this.props.stopFetchingUserBoards();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.createBoard.bind(this)}>
                    <input type="text" className="form-control" ref="BoardName" placeholder="Board name"/> <br />
                    <input type="text" className="form-control" ref="BoardDescription" placeholder="Description"/> <br />
                    <input type="text" className="form-control" ref="BoardTags" placeholder="Tags separated by commas (ex. dog, cat, ...)"/> <br />
                    <button type="submit" className="btn btn-danger">Create Board</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userBoards: state.userBoards
    }
}

export default connect(mapStateToProps, actions)(Boards);

