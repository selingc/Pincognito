import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';
import Popup from '../popup/modal.js';
import {browserHistory} from 'react-router';

class Search extends Component {
	constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
        this.goToBoard = this.goToBoard.bind(this);
    }

    openPopup(pin){
        this.setState({poppedUp: true});
        this.setState({pin: pin});

    }

    closePopup(){
        this.setState({poppedUp: false});
    }

    goToBoard(boardID){
        browserHistory.push("/board/"+boardID)
    }

    componentWillMount(){
        this.setState({query: this.props.location.query.q});
        this.props.resetSearch();
        this.props.search(this.props.location.query.q);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.query.q !== this.state.query){
            this.setState({query: nextProps.location.query.q});
            this.props.resetSearch();
            this.props.search(nextProps.location.query.q);
        }
    }

    render() {
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                return (
                    <Popup type="pin" pin={that.state.pin} closePopup={that.closePopup.bind(that)}/>
                )
            }else{
                return null;
            }
        }

        return (
            <div className="children">
                <h6><strong>{this.props.searchResults.pins.length}</strong> pin{this.props.searchResults.pins.length === 1 ? "" : "s"} found containing tags: {this.props.location.query.q}</h6>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.props.searchResults.pins ? this.props.searchResults.pins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="panel panel-danger border" onClick={this.openPopup.bind(null, pin)}>
                                    <div className="panel-body">
                                        <center><img src={pin.imageURL} className="my-panel-content images"/></center>
                                    </div>
                                    <div className="panel-heading">{pin.name}</div>
                                </div>
                            </div>
                        )) : null}
                </div>

                <h6><strong>{this.props.searchResults.boards.length}</strong> board{this.props.searchResults.boards.length === 1 ? "" : "s"} found containing tags: {this.props.location.query.q}</h6>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.props.searchResults.boards ? this.props.searchResults.boards.map((board, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="panel panel-danger border" onClick={this.goToBoard.bind(null, board.boardID)}>
                                    <div className="panel-body">
                                        <center><img src={board.imageURL} className="my-panel-content images"/></center>
                                    </div>
                                    <div className="panel-heading">{board.name}</div>
                                </div>
                            </div>
                        )) : null}
                </div>
                {getPopup()}
            </div>
        );
    }
}

function mapStateToProps(state){
	return{
        searchResults: state.searchResults
	}
}

export default connect(mapStateToProps, actions)(Search);