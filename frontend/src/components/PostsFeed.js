import React, { Component } from 'react';
import {
    Container, ListGroup, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import PropTypes from 'prop-types';

class PostsFeed extends Component {
    static propTypes = {
        getPosts: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.posts
        return (
            <Container>
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
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.post,
});



export default connect(
    mapStateToProps,
    { getPosts }
)(PostsFeed);