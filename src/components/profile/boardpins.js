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
                                <div className="col-lg-12">
                                    {pin.name}
                                    <img src={pin.imageURL} className="pins" />
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

