import axios from "axios";

const proxy = axios.create({
    baseURL: "http://localhost:4000/"

})

export const aircraftAPI = {
    getAircraftInfo(msn) {
        return proxy.get('aircraft/info/', {
            params: { msn: msn }
        }).then(response => response.data)
    },
    getLegs(msn) {
        return proxy.get('aircraft/legs/', {
            params: { msn: msn}
        }).then(response => response.data)
    },
    getSortedLegs(msn, from, to) {
        return proxy.get('aircraft/sortlegs/', {
            params: { msn: msn, from: from, to: to }
        }).then(response => response.data)
    },
    getAircraftsList() {
        return proxy.get('aircraft/aircrafts/').then(response => response.data)
    },
    addLeg(leg, msn) {
        return proxy.post('aircraft/legs/add', { leg, msn }).then(response => response.data)
    },
    redLeg(leg, msn, legId) {
        return proxy.post('aircraft/legs/red', { leg, msn, legId }).then(response => response.data)
    },
    delLeg(msn, legId) {
        return proxy.post('aircraft/legs/del', { msn, legId }).then(response => response.data)
    }
}