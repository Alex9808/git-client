import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles, Typography, Grid, Card, CardActionArea, CardMedia, CardContent} from "@material-ui/core";
import {Link} from "react-router-dom";
import {BranchIcon} from "../../components";

const styles = theme => ({});

class BranchesView extends Component {

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        const {branches} = this.state;
        return (
            <>
                <Grid container spacing={2}>
                    {branches.map((branch) => (
                        <Grid key={branch.ref_name} item md={3}>
                            <Card>
                                <CardActionArea component={Link} to={`/branch?ref=${branch.ref_name}`}>
                                    <CardMedia style={{textAlign: 'center'}}>
                                        <BranchIcon style={{fontSize: '100pt'}}/>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant={"h5"}>
                                            {branch.name}
                                        </Typography>
                                        <Typography paragraph variant={"body2"}>
                                            {branch.ref_name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }
}

BranchesView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(BranchesView);
