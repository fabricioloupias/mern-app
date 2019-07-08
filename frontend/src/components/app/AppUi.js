import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import NavTop from '../NavTop';
import PostsFeed from '../PostsFeed';
import LoginRegister from '../login-register/LoginRegister'

class AppUi extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render(){
        const { isAuthenticated } = this.props.auth;
        return(
            <>
                <LoginRegister />
                {console.log(isAuthenticated)}
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    null
)(AppUi);
