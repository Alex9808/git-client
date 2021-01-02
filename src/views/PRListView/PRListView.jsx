import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Paper,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    CardActionArea,
    CardMedia,
    Button,
    Chip,
    Avatar
} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {mergePr, updatePrStatus, listPrs} from "../../actions";
import Helmet from "react-helmet/es/Helmet";
import {red, green, purple} from "@material-ui/core/colors";
import ClosedIcon from "@material-ui/icons/Close";
import OpenIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/AddOutlined";
import {Link as RouterLink} from "react-router-dom";

const styles = theme => ({

    closedState: {
        backgroundColor: red["500"],
    },
    openState: {
        backgroundColor: green["500"],
    },
    mergedState: {
        backgroundColor: purple["500"],
        color: '#fff',
    },
});

class PRListView extends Component {

    componentDidMount() {
        this.props.listPrs();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.mergeState.loading && this.props.mergeState.loaded && !this.props.mergeState.loading && !this.props.listState.loading){
            this.props.listPrs();
        }
        if(prevProps.updateState.loading && this.props.updateState.loaded && !this.props.updateState.loading && !this.props.listState.loading){
            this.props.listPrs();
        }
        if((prevProps.mergeState.loading || prevProps.updateState.loading) && (this.props.mergeState.error || this.props.updateState.error) && !this.props.listStateloading){
            //Show error on Update PR Status or on Merge PR
            this.props.showMessage("Ocurrio un error", "error");
        }
    }

    updatePrStatus = (prId, prStatus) => () => {
        let newStatus = prStatus === 0? 1 : 0;
        this.props.updatePrStatus(prId, newStatus);
    }

    mergePr = prId => () => {
        this.props.mergePr(prId);
    }

    render() {
        const {classes, prs} = this.props;
        return (
            <>
                <Helmet>
                    <title>Pull Requests</title>
                </Helmet>
                <Paper style={{padding: 24}}>
                    <Typography variant={'h5'} gutterBottom>Pull Requests</Typography>

                    <Grid container spacing={3}>
                        {prs.map((pr, key) => (
                            <Grid key={key} item md={4}>
                                <Card>
                                    <CardHeader
                                        avatar={<Avatar>{pr.name.charAt(0).toUpperCase()}</Avatar>}
                                        title={pr.name}
                                        subheader={`${pr.authorName} (${pr.authorEmail})`}
                                        action={<Chip
                                            size="small"
                                            icon={pr.status === 0 || pr.status === 2 ? <OpenIcon/> : <ClosedIcon/>}
                                            style={{color: '#fff'}}
                                            className={pr.status === 0 ? classes.openState : pr.status === 1 ? classes.closedState : classes.mergedState}
                                            label={pr.status === 0 ? 'Open' : pr.status === 1 ? 'Closed' : 'Merged'}
                                            onClick={pr.status !== 2 ? this.updatePrStatus(pr.id, pr.status) : null}
                                            clickable={pr.status !== 2}
                                        />}
                                    />
                                    <CardContent>
                                        <Typography variant={"subtitle2"} gutterBottom>
                                            {pr.compare_branch} a {pr.base_branch}
                                        </Typography>

                                        <Typography variant={"caption"} paragraph>
                                            {new Date(pr.createdAt).toLocaleString()}
                                        </Typography>

                                        <Typography variant={"body1"}>
                                            {pr.description}
                                        </Typography>
                                        {pr.status === 2 && (
                                            <Typography variant={"caption"}>
                                                Combinada el dia {new Date(pr.mergedAt).toLocaleString()}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    <CardActions>
                                        {pr.status === 0 && (
                                            <Button onClick={this.mergePr(pr.id)} variant={"contained"}
                                                    color={"inherit"}
                                                    className={classes.mergedState}>
                                                Merge
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item container justyfy="center" alignItems="center" md={2}>
                            <Card>
                                <CardActionArea component={RouterLink} to={'/prs/add'}>
                                    <CardMedia>
                                        <AddIcon color={"primary"} style={{fontSize: '100pt'}}/>
                                    </CardMedia>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        )
    }
}

PRListView.propTypes = {
    classes: PropTypes.object,
    prs: PropTypes.array,
    listState: PropTypes.object,
    updateState: PropTypes.object,
    mergeState: PropTypes.object,
    listPrs: PropTypes.func,
    updatePrStatus: PropTypes.func,
    mergePr: PropTypes.func,
};

const mapStateToProps = state => ({
    prs: state.prs.prs,
    listState: state.prs.list,
    updateState: state.prs.update,
    mergeState: state.prs.merge,
});

const mapDispatchToProps = dispatch => bindActionCreators({listPrs, updatePrStatus, mergePr}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PRListView));
