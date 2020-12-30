import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Paper, Typography, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {fetchResource} from "../../helpers";
import {Helmet} from "react-helmet/es/Helmet";
import {Link} from "react-router-dom";

const styles = theme => ({});

class BranchView extends Component {

    state = {
        commits: [],
        branchName: '',
    }

    componentDidMount() {
        this.loadBranch();
    }

    loadBranch = () => {
        const {search} = this.props.location;

        fetchResource(`/api/commits${search}`, 'GET', null, (error, body) => {
            console.log(body);
            if (!error)
                this.setState({commits: body.commits, branchName: body.name});
        });
    }

    render() {
        const {classes} = this.props;
        const {commits, branchName} = this.state;
        // console.log(this.props);
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
                        {commits.map(commit => {
                            let date = new Date(commit.date);
                            date = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
                            return (
                                <ListItem component={Link} to={`/commit/${commit.commit}`} key={commit.commit} button>
                                    <ListItemText primary={<>{commit.message} <Typography
                                        variant={"caption"}>by {commit.author.name} ({commit.author.email})</Typography></>}
                                                  secondary={date}
                                    />
                                </ListItem>
                            )
                        })}
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
