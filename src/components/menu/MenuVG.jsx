import React, { Component } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



export default class MenuVG extends Component {
    constructor(props){
        super(props);

        this.state = {
            openMenu: false
        }

        const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
            flexGrow: 1,
            },
            menuButton: {
            marginRight: theme.spacing(2),
            },
            title: {
            flexGrow: 1,
            },
        }),
        );
    }

    render() {
        return (
            <React.Fragment>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </React.Fragment>
        );
    }
}

