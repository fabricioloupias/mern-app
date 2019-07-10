import React, { Component, Fragment } from 'react';
import { Alert, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Card, Button, TextField } from '@material-ui/core';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import './loginRegister.css';
import classnames from 'classnames';


class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            name: '',
            email: '',
            password: '',
            msg: null
        };


    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            this.props.clearErrors();
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL' || error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.message });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitLogin = e => {
        e.preventDefault();
        const { email, password } = this.state;

        const user = {
            email,
            password
        };
        // Attempt to login
        this.props.login(user);
        this.props.clearErrors();
    }

    onSubmitRegister = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);
        this.props.clearErrors();
    };

    render() {
        return (
            <div id="loginRegister">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col lg="6" md="8" sm="8">
                            <Card className="p-3">
                                <Nav tabs className="mb-4">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}
                                        >
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggleTab('2'); }}
                                        >
                                            Register
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        {this.state.msg ? (
                                            <Alert color='danger'>{this.state.msg}</Alert>
                                        ) : null}
                                        <Form className="mt-3">
                                            <FormGroup className="text-left">
                                                <TextField
                                                    id="outlined-name"
                                                    label="Email"
                                                    name="email"
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    type="email"
                                                    fullWidth
                                                />
                                                <TextField
                                                    id="outlined-name"
                                                    label="Password"
                                                    name="password"
                                                    onChange={this.onChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    type="password"
                                                    fullWidth
                                                />
                                                <Button variant="contained" color="primary" onClick={this.onSubmitLogin} style={{ marginTop: '2rem' }}>
                                                    Login
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {this.state.msg ? (
                                            <Alert color='danger'>{this.state.msg}</Alert>
                                        ) : null}
                                        <Form onSubmit={this.onSubmitRegister} className="mt-3">
                                            <FormGroup className="text-left">
                                                <Label for='name'>Name</Label>
                                                <Input
                                                    type='text'
                                                    name='name'
                                                    id='name'
                                                    placeholder='Name'
                                                    className='mb-3'
                                                    onChange={this.onChange}
                                                />

                                                <Label for='email'>Email</Label>
                                                <Input
                                                    type='email'
                                                    name='email'
                                                    id='email'
                                                    placeholder='Email'
                                                    className='mb-3'
                                                    onChange={this.onChange}
                                                />

                                                <Label for='password'>Password</Label>
                                                <Input
                                                    type='password'
                                                    name='password'
                                                    id='password'
                                                    placeholder='Password'
                                                    className='mb-3'
                                                    onChange={this.onChange}
                                                />
                                                <Button variant="contained" color="primary" style={{ marginTop: '2rem' }}>
                                                    Register
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Register
                    </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal> */}
            </div >
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, register, clearErrors }
)(LoginRegister);