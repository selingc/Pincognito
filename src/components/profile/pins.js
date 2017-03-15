import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';

class Pins extends Component {
    constructor(props){
        super(props);

        this.state = {poppedUp: false, modalDown: false, contentDown: false};
        this.onModalDown = this.onModalDown.bind(this);
        this.onContentDown = this.onContentDown.bind(this);
        this.onModalUp = this.onModalUp.bind(this);
        this.onContentUp = this.onContentUp.bind(this);
        this.checkClickLocation = this.checkClickLocation.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.createPin = this.createPin.bind(this);
    }

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

        this.closePopup();
    }

    onModalDown(){
        this.setState({modalDown: true});
        this.checkClickLocation();
    }

    onContentDown(){
        this.setState({contentDown: true});
        this.checkClickLocation();
    }

    onModalUp(){
        this.setState({modalDown: false});
        this.checkClickLocation();
    }

    onContentUp(){
        this.setState({contentDown: false});
        this.checkClickLocation();
    }

    checkClickLocation(){
        if(this.state.modalDown && !this.state.contentDown){
            this.closePopup();
        }
    }

    openPopup(){
        this.setState({poppedUp: true});
    }

    closePopup(){
        this.setState({poppedUp: false});
    }

    render() {
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                return (
                    <div className="modal" onMouseDown={that.onModalDown} onMouseUp={that.onModalUp}>
                        <div className="modal-content" onMouseDown={that.onContentDown} onMouseUp={that.onContentUp}>
                            <span onClick={that.closePopup}>X</span>
                            <h1>Create Pin</h1>
                            <form onSubmit={that.createPin.bind(that)}>
                                <input type="file" accept="image/*" className="form-control-file" id="image" ref="image"/> <br />
                                <select className="form-control" ref="board" id="dropdown" defaultValue="none">
                                    <option value="none" disabled>--Select a Board--</option>
                                    {that.props.userBoards.map((board, index) => (
                                        <option value={board.id} key={index}>{board.name}</option>
                                    ))}
                                </select><br />
                                <input type="text" className="form-control" ref="name" placeholder="Pin name" /> <br />
                                <input type="text" className="form-control" ref="description" placeholder="Description"/> <br />
                                <input type="text" className="form-control" ref="tags" placeholder="Tags separated by commas (ex. dog, cat, ...)"/> <br />
                                <button type="submit" className="btn btn-danger">Create Pin</button>
                            </form>
                        </div>
                    </div>
                )
            }else{
                return null;
            }
        }

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 panel panel-default">
                        <div className="panel-body">
                            <Link to={"/" + this.props.username} onClick={this.openPopup}>Create New Pin</Link>
                        </div>
                    </div>
                </div>

                {getPopup()}
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