import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class BoardPins extends Component {
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

    componentWillMount() {
        this.props.fetchBoardPins(this.props.params.boardid);
    }

    componentWillUnmount() {
        this.props.stopFetchingBoardPins(this.props.params.boardid);
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
                            <span className="glyphicon glyphicon-remove close" onClick={that.closePopup}></span>
                            <h1>Pin name</h1>
                            <hr className="stylehr"/>
                            
                        </div>
                    </div>
                )
            }else{
                return null;
            }
        }

        return (
            <div className="children">
                <h1>{this.props.boardPins.name}</h1>
                <div> {this.props.boardPins.pins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="panel panel-danger border" onClick={this.openPopup}>
                                        <div className="panel-body">
                                            <center><img src={pin.imageURL} className="my-panel-content"/></center>
                                        </div>
                                        <div className="panel-heading">{pin.name}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                 {getPopup()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        boardPins: {
            name: state.boardPins.name,
            pins: state.boardPins.pins
        }
    }
}

export default connect(mapStateToProps, actions)(BoardPins);

