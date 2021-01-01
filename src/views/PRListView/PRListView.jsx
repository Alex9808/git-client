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
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

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
                            <Grid key={key} item md={3}>
                                <Card>
                                    <CardHeader
                                        avatar={<Avatar>{pr.name.charAt(0).toUpperCase()}</Avatar>}
                                        title={pr.name}
                                        subheader={`${pr.authorName} (${pr.authorEmail})`}
                                        action={<Chip
                                            icon={pr.status === 0 || pr.status === 2 ? <OpenIcon/> : <ClosedIcon/>}
                                            style={{color: '#fff'}}
                                            className={pr.status === 0 ? classes.openState : pr.status === 1 ? classes.closedState : classes.mergedState}
                                            label={pr.status === 1 ? 'Open' : pr.status === 1 ? 'Closed' : 'Merged'}
                                        />}
                                        color={"inherit"}
                                        onClick={pr.status !== 2 ? this.updatePrStatus(pr.id, pr.status) : null}
                                    />
                                    <CardContent>
                                        <Typography variant={"subtitle2"} gutterBottom>
                                            {pr.baseBranchName} a {pr.compareBranchName}
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
                                        {pr.status === 2 && (
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
