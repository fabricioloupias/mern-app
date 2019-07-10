import React, { Component } from 'react';

//Components
import { List, ListItemIcon, ListItem, ListItemText, Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './navLeft.css';

class NavLeft extends Component {
    render() {
        return (
            <>
                <List component="nav" aria-label="">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
            </>
        );
    }
}

export default NavLeft;