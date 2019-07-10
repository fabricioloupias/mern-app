import React, { Component } from 'react';

//Components
import { List, ListItemIcon, ListItem, ListItemText, Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

class NavLeft extends Component {
    render() {
        return (
            <>
                <List component="nav" aria-label="Main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
                <Divider />
            </>
        );
    }
}

export default NavLeft;