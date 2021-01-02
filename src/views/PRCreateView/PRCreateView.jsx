import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Paper,
    Grid,
    TextField,
    Select,
    Switch,
    FormControl,
    InputLabel,
    MenuItem,
    FormControlLabel,
    Button,
    LinearProgress,
} from "@material-ui/core";
import {Helmet} from "react-helmet/es/Helmet";
import {bindActionCreators} from "redux";
import {fetchBranches, createPr} from "../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

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

class PRCreateView extends Component {
    state = {
        name: '',
        description: '',
        baseBranch: '',
        compareBranch: '',
        status: 0,
        useDefaultAuthor: true,
        authorName: '',
        authorEmail: '',

        mustRedirect: false,
        to: '',
    }

    componentDidMount() {
        this.props.fetchBranches();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.createState.loading && this.props.createState.loaded) {
            this.props.showMessage("Pull Request Creada con exito", "success");
            this.setState({mustRedirect: true, to: '/prs'});
        }
        if (prevProps.createState.loading && this.props.createState.error) {
            // Handle Error Message
            this.props.showMessage("Ocurrio un error al crear el Pull Request", "error")
        }
    }

    onChange = target => evt => {
        if (target === 'useDefaultAuthor') return this.setState({[target]: evt.target.checked})
        this.setState({[target]: evt.target.value});
    }
    createPr = evt => {
        console.log("Create PR");
        evt.preventDefault();
        let data = {};
        const {
            name,
            description,
            baseBranch,
            compareBranch,
            status,
            useDefaultAuthor,
            authorName,
            authorEmail
        } = this.state;

        data['name'] = name;
        data['description'] = description;
        data['base_branch'] = baseBranch;
        data['compare_branch'] = compareBranch;
        data['status'] = status;
        if (!useDefaultAuthor) {
            data['author']['authorName'] = authorName;
            data['author']['authorEmail'] = authorEmail;
        }

        this.props.createPr(data);
    }

    render() {
        const {classes, branches, createState} = this.props;
        const {loading} = createState;
        const {
            name,
            description,
            baseBranch,
            compareBranch,
            status,
            useDefaultAuthor,
            authorName,
            authorEmail,
            mustRedirect, to
        } = this.state;
        if (mustRedirect) return <Redirect to={to}/>
        return (
            <>
                <Paper className={classes.mainFrame}>
                    <Helmet>
                        <title>Nuevo Pull Request</title>
                    </Helmet>
                    <Typography variant={"h6"} paragraph>Agregar Pull Request</Typography>
                    <form onSubmit={this.createPr}>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <TextField
                                    label="Nombre"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="text"
                                    autoFocus
                                    value={name}
                                    onChange={this.onChange('name')}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    label="Descripcion"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="text"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={this.onChange('description')}
                                />
                            </Grid>

                            <Grid item md={5}>
                                <FormControl required fullWidth>
                                    <InputLabel id="compare-branch-field-label">Origen</InputLabel>
                                    <Select labelId="compare-branch-field-label"
                                            value={compareBranch} onChange={this.onChange("compareBranch")}>
                                        <MenuItem value="" disabled>Select compare branch</MenuItem>
                                        {branches.map((branch, key) => (
                                            <MenuItem disabled={branch.name === baseBranch} key={key}
                                                      value={branch.name}>{branch.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container item md={2} direction="row" justify="center" alignItems="center">
                                <Typography align="center" variant="caption">de</Typography>
                            </Grid>
                            <Grid item md={5}>
                                <FormControl required fullWidth>
                                    <InputLabel id="base-branch-field-label">Destino</InputLabel>
                                    <Select labelId="base-branch-field-label" value={baseBranch}
                                            onChange={this.onChange("baseBranch")}>
                                        <MenuItem value="" disabled>Select base branch</MenuItem>
                                        {branches.map((branch, key) => (
                                            <MenuItem disabled={branch.name === compareBranch} key={key}
                                                      value={branch.name}>{branch.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={12}>
                                <FormControlLabel
                                    control={<Switch checked={useDefaultAuthor} color={"primary"}
                                                     onChange={this.onChange("useDefaultAuthor")}
                                                     value={useDefaultAuthor}/>}
                                    label="Usar Autor por defecto del repositorio"/>
                            </Grid>
                            {!useDefaultAuthor && (
                                <>
                                    <Grid item md={6}>
                                        <TextField
                                            label="Nombre del Autor"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="text"
                                            value={authorName}
                                            onChange={this.onChange("authorName")}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            label="Email del Autor"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="email"
                                            value={authorEmail}
                                            onChange={this.onChange("authorEmail")}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item md={12}>
                                <FormControl required fullWidth>
                                    <InputLabel id="status-field-label">Status</InputLabel>
                                    <Select labelId="status-field-label" value={status}
                                            onChange={this.onChange("status")}>
                                        <MenuItem value="" disabled>Select status</MenuItem>
                                        <MenuItem value={0}>Open</MenuItem>
                                        {/*<MenuItem value={1}>Close</MenuItem>*/}
                                        <MenuItem value={2}>Merged</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item container md={12} justify="flex-end">
                                <Button disabled={loading} variant="contained" color="primary" type="submit">
                                    Crear Pull Request
                                </Button>
                            </Grid>
                            <Grid item md={12}>
                                {loading && (
                                    <LinearProgress variant="indeterminate"/>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </>
        )
    }
}

PRCreateView.propTypes = {
    classes: PropTypes.object,
    branches: PropTypes.array,
    showMessage: PropTypes.func,
};

const mapStateToProps = state => ({
    branches: state.branches.branches,
    createState: state.prs.create
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchBranches, createPr}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PRCreateView));
