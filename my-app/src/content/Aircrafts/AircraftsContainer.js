import React from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { getAircraftInfo, getAircrafts } from "../../redux/legsReduser"
import Aircrafts from './Aircrafts';

class AircraftsContainer extends React.Component {

    componentDidMount() {
        this.props.getAircrafts()
    }

    render() {
        return <Aircrafts aircrafts={this.props.aircrafts}
            aircraftInfo={this.props.aircraftInfo}
            isPreloader={this.props.isPreloader}
            getAircraftInfo={this.props.getAircraftInfo}
            getAircrafts={this.props.getAircrafts} />
    }
}


let mapStateToProps = (state) => {
    return {
        aircrafts: state.legs.aircrafts,
        aircraftInfo: state.legs.aircraftInfo,
        isPreloader: state.legs.isPreloader
    }
}



export default compose(connect(mapStateToProps, { getAircraftInfo, getAircrafts }))(AircraftsContainer)
