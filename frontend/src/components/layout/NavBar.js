import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';


class NavBar extends Component{
    onLogoutClick = (event) =>{
        event.preventDefault();
        this.props.logoutUser();
    }
    render(){
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/patients">
                Patients
              </Link>
            </li>
              <li className="nav-item">
                <a href="" onClick={this.onLogoutClick} className='nav-link'>Logout</a>
              </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/login">
                  Login
                  </Link>
              </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">      
                <div className="collapse navbar-collapse" id="mobile-nav">
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        logoutUser : () => {
            dispatch(logoutUser())
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (NavBar);