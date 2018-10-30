import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';

class Login extends Component{
    state = {
        username: '',
        password: '',
        errors : {}
    }
    componentDidMount(){
        // Check if we login
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/patients');
        }
      }
  
      componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
          this.props.history.push('/patients');
        }
        if(nextProps.errors){
          this.setState({ errors: nextProps.errors})
        }
      }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    onSubmit = (event) =>{
        event.preventDefault();
        const login={
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(login);
    }

    render(){
        const { errors } = this.state;
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <input 
                placeholder = "username"
                name='username'
                type='text'
                value = {this.state.username}
                onChange = {this.onChange}
                error={errors.username}
                required
                />
                <input 
                placeholder = "password"
                name='password'
                type='password'
                value = {this.state.password}
                onChange = {this.onChange}
                error={errors.password}
                required
                />
                <input type="submit" className='btn' />
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (login) => {
            dispatch(loginUser(login))
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Login);