import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';

// needs to be rewritten to avoid lifecycle methods.
// main root page (before logging in) will go here.

class Home extends Component {
	sayHello(e){
		e.preventDefault();

		this.props.sayHello();
	}

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
    }

    componentWillMount(){
        this.props.fetchPins();
    }

    componentWillUnmount(){
        this.props.stopFetchingPins();
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
                <h1>Pinfeed</h1>
                <button type="submit" onClick={this.sayHello.bind(this)}>Say Hello</button>
                <div>{this.props.hello}</div>

                <div>{this.props.pins.map((pin, index) => (
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
		hello: state.hello,
        pins: state.pins
	}
}

export default connect(mapStateToProps, actions)(Home);