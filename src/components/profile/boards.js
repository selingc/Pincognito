import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class extends Component {
    constructor(props){
        super(props);

        this.state = {boards: []};
    }

    componentWillMount(){
        const that = this;

        firebase.database().ref("user-boards").child(this.props.username).on("child_added", function(snap){
            that.setState({boards: this.state.boards.concat(snap.val())});
        });
    }

    createBoard(e){
        e.preventDefault();

        
        firebase.database().ref("user-boards").child(this.props.username).set();
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