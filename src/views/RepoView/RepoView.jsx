import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Paper,
    Link,
    Divider,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent
} from "@material-ui/core";
import {connect} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {BranchIcon} from '../../components';

const styles = theme => ({});

class RepoView extends Component {
    render() {
        const {classes, repoName, repoUrl} = this.props;
        return (
            <>
                <Paper style={{padding: 24}}>
                    <Typography paragraph variant={"subtitle1"}>Nombre del Repositorio: <b>{repoName}</b></Typography>
                    <Typography paragraph variant={"subtitle1"}>
                        URL del Repositorio: <Link href={repoUrl}
                                                   target={"_blank"}>{repoUrl}</Link>
                    </Typography>

                    <Divider/>

                    <div style={{display: 'flex'}}>
                        <Card style={{width: 260, marginTop: 16}}>
                            <CardActionArea component={RouterLink} to={'/branches'}>
                                <CardMedia style={{textAlign: 'center'}}>
                                    <BranchIcon style={{fontSize: '100pt'}}/>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant={"h6"} gutterBottom>
                                        Branchs
                                    </Typography>
                                    <Typography variant={"body2"}>
                                        Ver todas las Branchs del Repositorio
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card style={{width: 260, marginTop: 16, marginLeft: 24}}>
                            <CardActionArea component={RouterLink} to={'/prs'}>
                                <CardMedia style={{textAlign: 'center'}}>
                                    <BranchIcon style={{fontSize: '100pt'}}/>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant={"h6"} gutterBottom>
                                        Pull Requests
                                    </Typography>
                                    <Typography variant={"body2"}>
                                        Ver y gestionar todas las Pull Requests del Repositorio
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </Paper>
            </>
        )
    }
}

RepoView.propTypes = {
    classes: PropTypes.object,
};
const mapStateToProps = state => ({
    repoName: state.repo.name,
    repoUrl: state.repo.url
});
export default connect(mapStateToProps)(withStyles(styles)(RepoView));
