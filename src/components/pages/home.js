import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.renderBoards = this.renderBoards.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
    }

    componentWillMount(){
        //this.props.fetchBoards();
    }

    createBoard(e){
        e.preventDefault();
        this.props.createBoard({name: this.refs.name.value});
        this.refs.name.value = "";
    }

    deleteBoard(id){
        this.props.deleteBoard(id);
    }

    componentWillUnmount(){
        //this.props.stopFetchingBoards();
    }

    renderBoards(){
        if(this.props.boards){
            return this.props.boards.map((board, key)=>(
                <li key={key} onClick={this.deleteBoard.bind(null, board.id)}>{board.name}</li>
            ));
        }
    }

    render() {
        return (
            <div className="children">
                <h1>Homepage</h1>
                <form onSubmit={this.createBoard.bind(this)}>
                    <input type="text" className="form-control" ref="name" placeholder="Board Name"/>
                    <button type="submit" className="btn btn-primary">Create Board</button>
                </form>
                <ul>
                    {this.renderBoards()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        boards: state.boards
    };
}

export default connect(mapStateToProps, actions)(Home);