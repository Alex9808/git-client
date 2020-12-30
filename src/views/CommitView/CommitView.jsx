import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Typography, Paper, Divider, List, ListItem, ListItemText, ListItemAvatar, Icon} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {fetchCommit} from "../../actions";
import {connect} from "react-redux";
import Helmet from "react-helmet/es/Helmet";

const styles = theme => ({});

class CommitView extends Component {

    componentDidMount() {
        this.fetchCommit();
    }

    fetchCommit = () => {
        let commit = this.props.match.params.commit;
        this.props.fetchCommit(commit);
    }

    render() {
        const {classes, author, date, message, tree} = this.props;
        return (
            <>
                <Helmet>
                    <title>{message}</title>
                </Helmet>
                <Paper style={{padding: 24}}>
                    <Typography variant={"subtitle1"}>Realizada
                        por: <b>{author.name} ({author.email})</b> el día {new Date(date).toLocaleString()}
                    </Typography>

                    <Divider/>

                    <Typography paragraph variant={"h6"}>Archivos Modificados ({tree.length})</Typography>

                    <List>
                        {tree.map((file, key) => (
                            <ListItem key={key}>
                                <ListItemAvatar>
                                    <Icon>insert_drive_file</Icon>
                                </ListItemAvatar>
                                <ListItemText primary={file.new}/>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </>
        )
    }
}

CommitView.propTypes = {
    classes: PropTypes.object,
    message: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.object,
    tree: PropTypes.array,
    fetchCommit: PropTypes.func,
};

const mapStateToProps = state => ({
    message: state.commits.commit.message,
    date: state.commits.commit.date,
    author: state.commits.commit.author,
    tree: state.commits.commit.tree,

});

const mapDispatchToProps = dispatch => bindActionCreators({fetchCommit}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommitView));
