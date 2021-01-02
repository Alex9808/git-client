import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Paper,
    TextField,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Icon,
    LinearProgress
} from "@material-ui/core";
import GoIcon from "@material-ui/icons/KeyboardArrowRight";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchRepo, cloneRepo} from "../../actions";
import {Redirect} from "react-router-dom";
import {Helmet} from "react-helmet/es/Helmet";

const styles = theme => ({
    mainFrame: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing(4),
        width: '50vw',
        boxShadow: theme.shadows[5],
    }
});

const defaultRepos = [
    {
        name: '99minutos/99minutos-fullstack-interview-test',
        url: 'https://github.com/99minutos/99minutos-fullstack-interview-test.git'
    },
    {
        name: 'Alex9808/git-client',
        url: 'https://github.com/Alex9808/git-client.git'
    },
    {
        name: 'Alex9808/99minutos-fullstack-interview-test',
        url: 'https://github.com/Alex9808/99minutos-fullstack-interview-test.git'
    }

];

class NewRepoView extends Component {

    state = {
        url: ''
    }

    componentDidMount() {
        this.props.fetchRepo();
    }

    cloneRepo = () => {
        this.props.cloneRepo(this.state.url);
    }

    onChangeUrl = evt => {
        this.setState({url: evt.target.value});
    }

    render() {
        const {classes, repoClone, repoFetch} = this.props;
        if (repoFetch.loaded || repoClone.loaded) return <Redirect to={'/repo'}/>
        return (
            <Paper className={classes.mainFrame}>
                <Helmet>
                    <title>Repositorio de Trabajo</title>
                </Helmet>
                <Typography variant={"h6"} paragraph>Repositorio de Trabajo</Typography>
                <div style={{display: 'flex'}}>
                    <TextField
                        label={"URL del Repositorio"}
                        variant={"outlined"}
                        autoFocus
                        style={{width: '85%'}}
                        value={this.state.url}
                        onChange={this.onChangeUrl}
                    />
                    <div style={{flexGrow: 1}}/>
                    <Fab onClick={this.cloneRepo} color={"primary"}><GoIcon/></Fab>
                </div>

                <div>
                    <List>
                        {defaultRepos.map((repo, key) => (
                            <ListItem onClick={() => {
                                this.setState({url: repo.url}, () => this.cloneRepo());
                            }} key={key} button>
                                <ListItemAvatar>
                                    <Icon>source</Icon>
                                </ListItemAvatar>
                                <ListItemText primary={repo.name}
                                              secondary={repo.url}/>
                            </ListItem>
                        ))}
                    </List>
                </div>

                <div style={{height: 8, marginTop: 6}}>
                    {repoClone.loading && (
                        <LinearProgress variant={"indeterminate"}/>
                    )}
                </div>

            </Paper>
        )
    }
}

NewRepoView.propTypes = {
    classes: PropTypes.object,
    repoFetch: PropTypes.object,
    repoClone: PropTypes.object,

    fetchRepo: PropTypes.func,
    cloneRepo: PropTypes.func,
};

const mapStateToProps = state => ({
    repoFetch: state.repo.fetch,
    repoClone: state.repo.clone
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchRepo, cloneRepo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewRepoView));