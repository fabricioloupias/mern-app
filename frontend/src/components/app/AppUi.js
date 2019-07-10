import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import NavTop from '../navigationTop/NavTop';
import PostsFeed from '../feed/PostsFeed';
import LoginRegister from '../login-register/LoginRegister'
import { Container, Row, Col } from 'reactstrap';
import NavLeft from '../navLeft/NavLeft'

class AppUi extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <>
                {!isAuthenticated ?
                    <LoginRegister /> :
                    <div>
                        <NavTop />
                        <Container fluid>
                            <Row>
                                <Col lg="2" md="2">
                                  <NavLeft />  
                                </Col>
                                <Col lg="1">
                                </Col>
                                <Col md="6">
                                <PostsFeed />
                                </Col>
                            </Row>
                        </Container>
                        
                    </div>
                }
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
