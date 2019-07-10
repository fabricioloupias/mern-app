import React, { Component } from 'react';
import {
    Container, ListGroup, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Alert
} from 'reactstrap';
import { Card, Avatar, CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import './postFeed.css';



class PostsFeed extends Component {
    static propTypes = {
        getPosts: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.posts;
        const { isAuthenticated } = this.props.auth;
        const postsSort = posts.sort((a, b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        }).reverse()
        return (
            <Container>
                {isAuthenticated ?
                    <>
                        {postsSort.map((post) => (
                            <Card key={post._id} className="cardPost mb-5">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" src={post.userUrlImg}>
                                            R
                                        </Avatar>
                                    }
                                    title={post.createdBy}
                                    subheader={
                                        <Moment format="DD/MMM HH:mm">
                                            {post.createdAt}
                                        </Moment>
                                    }
                                />
                                <CardImg top width="100%" src={post.urlImg || null} alt="" />
                                <CardBody>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardText>{post.description}</CardText>
                                </CardBody>
                            </Card>
                        ))}
                    </>
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