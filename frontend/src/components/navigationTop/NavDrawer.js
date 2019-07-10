import React, { Component, Fragment } from 'react';
import { Drawer, Button } from '@material-ui/core';

class NavDrawer extends Component {
    constructor(props) {
        super(props)
        const [state, setState] =  {
            isOpen: false,
        }
    }
    

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, side: open });
    };

    render() {
        return (
            <div>
                <Button onClick={toggleDrawer('isOpen', true)}>Open Left</Button>
                <Drawer  onClose={toggleDrawer('isOpen', false)}>
                    {sideList('left')}
                </Drawer>
            </div>

        );
    }
}

export default NavDrawer;