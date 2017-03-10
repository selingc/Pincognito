import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class extends Component {
    constructor(props){
        super(props);

        this.state = {pins: []};
    }

    componentWillMount(){
        const that = this;

        firebase.database().ref("user-pins").child(this.props.username).on("child_added", function(snap){
            that.setState({pins: this.state.pins.concat(snap.val())});
        });
    }

    render() {
        return (
            <div>
                <input type="file" className="form-control-file" id="image" /> <br />
                <select className="form-control" id="dropdown">
                    <option>Board 1</option>
                    <option>Board 2</option>
                </select> <br />
                <input type="text" className="form-control" ref="PinName" placeholder="Pin name" /> <br />
                <input type="text" className="form-control description" ref="PinDescription" placeholder="Description"/> <br />
                <button type="submit" className="btn btn-danger">Create Pin</button>

            </div>
        );
    }
}