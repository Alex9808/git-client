import React, {Component} from "react";
import * as PropTypes from 'prop-types';
import {withStyles, Snackbar} from "@material-ui/core";
import {MuiAlert} from "../../components";
import {NavigationBar} from '../../components';
import {Helmet} from "react-helmet/es/Helmet";
import {renderRoutes} from "react-router-config";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    main: {
        margin: theme.spacing(10),
    },
});

class AppLayout extends Component {

    componentDidMount() {
    }

    state = {
        snackMsg: '',
        showSnack: false,
        snackType: '',
    };

    showSnack = (msg, type) => {
        this.setState({showSnack: true, snackMsg: msg, snackType: type});
    }

    hideSnack = () => {
        this.setState({showSnack: false, snackMsg: '', snackType: ''})
    }

    render() {
        const {classes, route, repoLoaded, repoCloned} = this.props;
        const {routes} = route;
        if ((!repoLoaded || repoCloned) && (!repoCloned || repoLoaded)) return <Redirect to={"/"}/>
        return (
            <React.Fragment>
                <Helmet>
                    <title>GIT HISTORY</title>
                </Helmet>
                <NavigationBar location={this.props.location} goBack={this.props.history.goBack}
                               repoName={this.props.repoName}/>
                <main className={classes.main}>
                    {renderRoutes(routes)}
                </main>

                <MuiAlert onClose={this.hideSnack} type={this.state.snackType} message={this.state.snackMsg}
                          open={this.state.showSnack}/>
            </React.Fragment>
        )
    }
}

AppLayout.propTypes = {
    classes: PropTypes.object,
    repoName: PropTypes.string,
    repoUrl: PropTypes.string,
    repoLoaded: PropTypes.bool,
};

const mapStateToProps = state => ({
    repoName: state.repo.name,
    repoUrl: state.repo.url,
    repoLoaded: state.repo.fetch.loaded,
    repoCloned: state.repo.clone.loaded,
});


export default connect(mapStateToProps)(withStyles(styles)(AppLayout));
