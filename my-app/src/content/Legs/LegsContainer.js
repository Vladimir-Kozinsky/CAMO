import React from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import Legs from "./Legs";
import { getAircraftInfo, getAircrafts, getLegs, addLeg, redLeg, delLeg, getSortedLegs } from "../../redux/legsReduser"


class LegsContainer extends React.Component {

    componentDidMount() {
        this.props.getAircrafts()
    }

    render() {
        return <Legs aircrafts={this.props.aircrafts}
            aircraftInfo={this.props.aircraftInfo}
            legs={this.props.legs}
            sortedLegs={this.props.sortedLegs}
            legsAddRes={this.props.legsAddRes}
            isPreloader={this.props.isPreloader}
            getAircraftInfo={this.props.getAircraftInfo}
            getAircrafts={this.props.getAircrafts}
            getLegs={this.props.getLegs}
            addLeg={this.props.addLeg}
            redLeg={this.props.redLeg}
            delLeg={this.props.delLeg}
            getSortedLegs={this.props.getSortedLegs} />
    }
}


let mapStateToProps = (state) => {
    return {
        aircrafts: state.legs.aircrafts,
        aircraftInfo: state.legs.aircraftInfo,
        legs: state.legs.legs,
        sortedLegs: state.legs.sortedLegs,
        legsAddRes: state.legs.legsAddRes,
        isPreloader: state.legs.isPreloader
    }
}



export default compose(connect(mapStateToProps, { getAircraftInfo, getAircrafts, getLegs, addLeg, redLeg, delLeg, getSortedLegs }))(LegsContainer)
