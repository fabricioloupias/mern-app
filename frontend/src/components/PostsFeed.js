import React, { Component } from 'react';
import {
    Container, ListGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PropTypes from 'prop-types';

class PostsFeed extends Component {
    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.posts
        const { isAuthenticated } = this.props.auth
        return (
            <Container>
                {isAuthenticated ?
                    <ListGroup>
                        {posts.map((post) => (
                            <Card key={post._id}>
                                <CardImg top width="100%" src={post.urlImg} alt="" />
                                <CardBody>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>{post.description}</CardText>
                                </CardBody>
                            </Card>
                        ))}
                    </ListGroup>
                    :
                    <Alert color="warning">Login first</Alert>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.post,
    auth: state.auth
});



export default connect(
    mapStateToProps,
    { getPosts }
)(PostsFeed);