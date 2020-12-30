import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Typography, Paper} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {fetchCommit} from "../../actions";
import {connect} from "react-redux";

const styles = theme => ({});

class CommitView extends Component {
    render() {
        const {classes, author, commitSha, date, message, tree} = this.props;
        return (
            <>
                <Helmet>
                    <title>{message}</title>
                </Helmet>
                <Paper style={{padding: 24}}>
                    <Typography variant={"subtitle1"}>Realizada
                        por: <b>{author.name || ''} ({author.email || ''})</b> el día {new Date(date).toLocaleString()}
                    </Typography>
                </Paper>
            </>
        )
    }
}

CommitView.propTypes = {
    classes: PropTypes.object,
    commitSha: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.object,
    tree: PropTypes.array,
    fetchCommit: PropTypes.func,
};

const mapStateToProps = state => ({
    commitSha: state.commits.commit.commitSha,
    message: state.commits.commit.message,
    date: state.commits.commit.date,
    author: state.commits.commit.author,
    tree: state.commits.commit.tree,

});

const mapDispatchToProps = dispatch => bindActionCreators({fetchCommit}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommitView));
