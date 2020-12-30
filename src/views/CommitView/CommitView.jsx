import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Typography} from "@material-ui/core";

const styles = theme => ({});

class CommitView extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Typography>Commit info</Typography>
            </>
        )
    }
}

CommitView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CommitView);
