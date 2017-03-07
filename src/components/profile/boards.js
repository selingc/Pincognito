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
                    <input type="text" className="form-control" ref="name" placeholder="Board name"/>
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas"/>
                    <button type="submit" className="btn btn-primary">Create board</button>
                </form>
            </div>
        );
    }
}