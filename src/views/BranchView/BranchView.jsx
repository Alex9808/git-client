import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Paper, Typography, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {Helmet} from "react-helmet/es/Helmet";
import {Link} from "react-router-dom";
import {fetchCommits} from "../../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const styles = theme => ({});

class BranchView extends Component {

    componentDidMount() {
        this.loadBranch();
    }

    loadBranch = () => {
        let {location, fetchCommits} = this.props;
        fetchCommits(location.search.split('=')[1]);
    }

    render() {
        const {classes, commits, branchName} = this.props;
        return (
            <>
                <Helmet>
                    <title>Branch {branchName}</title>
                </Helmet>

                <Paper style={{padding: 24}}>
                    <Typography variant={"h5"} gutterBottom>
                        Commits
                    </Typography>
                    <Divider/>
                    <List>
                        {commits.map(commit => (
                                <ListItem component={Link} to={`/commit/${commit.commit}`} key={commit.commit} button>
                                    <ListItemText primary={<>{commit.message} <Typography
                                        variant={"caption"}>by {commit.author.name} ({commit.author.email})</Typography></>}
                                                  secondary={new Date(commit.date).toLocaleString()}
                                    />
                                </ListItem>
                            )
                        )}
                    </List>
                </Paper>
            </>
        )
    }
}

BranchView.propTypes = {
    classes: PropTypes.object,
    branchName: PropTypes.string,
    commits: PropTypes.array
};

const mapStateToProps = state => ({
    branchName: state.commits.branch.branchName,
    commits: state.commits.branch.commits,
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchCommits}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BranchView));
