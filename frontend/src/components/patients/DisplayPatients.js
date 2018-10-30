import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPatients} from '../../actions/patientAction';

class DisplayPatients extends Component{
    componentDidMount(){
        this.props.loadPatients(this.props.auth.user)
    }
    render(){
        return(
            <div>
                {this.props.patients.patients.map( (patient, id) => <li key={`key_${id}`}>{patient.patientName}</li>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        patients: state.patients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPatients: (user) => {
            dispatch(loadPatients(user))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (DisplayPatients);