import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class BoardPins extends Component {

    componentWillMount() {
        this.props.fetchBoardPins(this.props.params.boardid);
    }

    componentWillUnmount() {
        this.props.stopFetchingBoardPins(this.props.params.boardid);
    }

    render() {
        return (
            <div className="children">
                <div> {this.props.boardPins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="panel panel-danger">
                                        <div className="panel-heading">{pin.name}</div>
                                        <div className="panel-body">
                                            <center><img src={pin.imageURL} className="my-panel-content"/></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        boardPins: state.boardPins
    }
}

export default connect(mapStateToProps, actions)(BoardPins);

