import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Paper, Typography, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {fetchResource} from "../../helpers";
import {Helmet} from "react-helmet/es/Helmet";
import {Link} from "react-router-dom";

const styles = theme => ({});

class BranchView extends Component {

    componentDidMount() {

    }

    loadBranch = () => {
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
};

export default withStyles(styles)(BranchView);
