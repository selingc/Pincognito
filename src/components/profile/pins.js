import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class Pins extends Component {
    createPin(e){
        e.preventDefault();

        var data = {
            file: this.refs.image.files[0],
            name: this.refs.name.value,
            description: this.refs.description.value,
            tags: this.refs.tags.value
        }

        this.props.createBoardPin(this.refs.board.value, data);

        this.refs.name.value = "";
        this.refs.description.value = "";
        this.refs.tags.value = "";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.createPin.bind(this)}>
                    <input type="file" accept="image/*" className="form-control-file" id="image" ref="image"/> <br />
                    <select className="form-control" ref="board" id="dropdown" defaultValue="none">
                        <option value="none" disabled>--Select a Board--</option>
                        {this.props.userBoards.map((board, index) => (
                            <option value={board.id} key={index}>{board.name}</option>
                        ))}
                    </select><br />
                    <input type="text" className="form-control" ref="name" placeholder="Pin name" /> <br />
                    <input type="text" className="form-control" ref="description" placeholder="Description"/> <br />
                    <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)"/> <br />
                    <button type="submit" className="btn btn-danger">Create Pin</button>
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

export default connect(mapStateToProps, actions)(Pins)