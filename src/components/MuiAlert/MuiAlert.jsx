import React from "react";
import * as PropTypes from "prop-types";
import {
    makeStyles,
    Snackbar,
} from "@material-ui/core";
import {red, yellow, green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: green["500"],
        color: '#fff',
    },
    warning: {
        backgroundColor: yellow["500"],
        color: '#333',
    },
    error: {
        backgroundColor: red["500"],
        color: '#fff',
    },
    default: {},
}));


function MuiAlert(props) {
    const classes = useStyles();
    let className = classes.default;
    switch (props.type) {
        case 'success':
            className = classes.success;
            break;
        case 'warning':
            className = classes.warning;
            break;
        case 'error':
            className = classes.error;
            break;
        default:
            className = classes.default;
    }
    return (
        <Snackbar ContentProps={{className: className}} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} autoHideDuration={6000} className={className} message={props.message} onClose={props.onClose} open={props.open}/>
    )
}

MuiAlert.propTypes = {
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired

};


export default MuiAlert;