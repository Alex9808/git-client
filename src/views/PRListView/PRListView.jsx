import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Typography} from "@material-ui/core";

const styles = theme => ({});

class PRListView extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Typography>PRListView</Typography>
            </>
        )
    }
}

PRListView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(PRListView);
