import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

class NavTop extends Component {

    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
                <Navbar color='dark' dark expand='sm' className='mb-5'>
                    <Container fluid>
                        <NavbarBrand href='/'>Intranet</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                {isAuthenticated ?
                                    <Fragment>
                                        
                                        <NavItem>
                                            <span className='navbar-text mr-3'>
                                                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                                            </span>
                                        </NavItem>
                                        <NavItem>
                                            <Logout />
                                        </NavItem>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <NavItem>
                                            <RegisterModal />
                                        </NavItem>
                                        <NavItem>
                                            <LoginModal />
                                        </NavItem>
                                    </Fragment>
                                }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    null
)(NavTop);