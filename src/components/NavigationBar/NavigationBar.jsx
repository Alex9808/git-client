import React from "react";
import * as PropTypes from "prop-types";
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Icon,
    Menu,
    MenuItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet/es/Helmet";

const useStyles = makeStyles((theme) => ({
    appTitle: {
        letterSpacing: '2px',
        fontWeight: '500',
    },
}));


function NavigationBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [title, setTitle] = React.useState(document.title);
    const handleClose = () => setAnchorEl(null);
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    return (
        <AppBar color={"primary"} position={"fixed"}>
            <Helmet onChangeClientState={(newState) => setTitle(newState.title)}/>
            <Toolbar>
                {props.location.pathname !== '/repo' && (
                    <IconButton onClick={props.goBack} color={"inherit"}>
                        <BackIcon/>
                    </IconButton>
                )}
                <Typography variant={"h6"} componet={"h1"} className={classes.appTitle}>
                    GIT HISTORY
                </Typography>
                <div style={{flexGrow: 1}}/>

                <Typography style={{textTransform: 'capitalize'}} variant={"h5"} componet={"h1"}
                            className={classes.appTitle}>
                    {props.repoName}
                </Typography>
                <Typography style={{marginLeft: 8}} variant={"subtitle2"}>{`${title}`}</Typography>
                <div style={{flexGrow: 1}}/>

                <IconButton onClick={handleClick} color={"inherit"}>
                    <Icon>more_vert</Icon>
                </IconButton>
                {/*Not Supported*/}
                {/*<Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
                    <MenuItem onClick={props.deleteRepo}>
                        <ListItemIcon>
                            <Icon>exit_to_app</Icon>
                        </ListItemIcon>
                        <ListItemText primary={"Salir"}/>
                    </MenuItem>
                </Menu>*/}
            </Toolbar>
        </AppBar>
    )
}

NavigationBar.propTypes = {
    repoName: PropTypes.string,
    goBack: PropTypes.func,
    location: PropTypes.object,
    deleteRepo: PropTypes.func
};


export default NavigationBar;