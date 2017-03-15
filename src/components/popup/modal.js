import React, { Component } from 'react';
import Pin from './pin.js';
import CreatePin from './createPin.js';
import CreateBoard from './createBoard.js';

class Modal extends Component {
    constructor(props){
        super(props);

        this.state = {poppedUp: false, modalDown: false, contentDown: false};
        this.onModalDown = this.onModalDown.bind(this);
        this.onContentDown = this.onContentDown.bind(this);
        this.onModalUp = this.onModalUp.bind(this);
        this.onContentUp = this.onContentUp.bind(this);
        this.checkClickLocation = this.checkClickLocation.bind(this);
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
            this.props.closePopup();
        }
    }

    render() {
        const that = this;

        function getContent(){
            if(that.props.type==="createBoard"){
                return(
                    <CreateBoard username={that.props.username} closePopup={that.props.closePopup}/>
                )
            }else if(that.props.type==="createPin"){
                return(
                    <CreatePin username={that.props.username} closePopup={that.props.closePopup}/>
                )
            }else{
                return(
                    <Pin pin={that.props.pin} closePopup={that.props.closePopup}/>
                )
            }
        }

        return (
            <div className="modal" onMouseDown={that.onModalDown} onMouseUp={that.onModalUp}>
                <div className="modal-content" onMouseDown={that.onContentDown} onMouseUp={that.onContentUp}>
                    <span className="glyphicon glyphicon-remove close" onClick={that.props.closePopup}></span>
                    {getContent()}
                </div>
            </div>
        );
    }
}

export default Modal;

