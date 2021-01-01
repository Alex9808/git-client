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
} from "@material-ui/core";
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

class PRCreateView extends Component {
    state = {
        name: '',
        description: '',
        baseBranch: '',
        compareBranch: '',
        status: 0,
        useDefaultAuthor: true,
        authorName: '',
        authorEmail: ''
    }
    onChange = target => evt => {
        if(target === 'useDefaultAuthor') return this.setState({[target]: evt.target.checked })
        this.setState({[target]: evt.target.value});
    }
    createPr = evt => {
        evt.preventDefault();

    }
    render() {
        const {classes, branches} = this.props;
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
                                    rows={6}
                                    value={description}
                                    onChange={this.onChange('description')}
                                />
                            </Grid>
                            <Grid item md={5}>
                                <FormControl required fullWidth>
                                    <InputLabel id="base-branch-field-label">Base Branch</InputLabel>
                                    <Select labelId="base-branch-field-label" value={baseBranch}
                                            onChange={this.onChange("baseBranch")}>
                                        <MenuItem value="" disabled>Select base branch</MenuItem>
                                        {branches.map((branch, key) => (
                                            <MenuItem disabled={branch.ref_name === compareBranch} key={key}
                                                      value={branch.ref_name}>{branch.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={2}>
                                <Typography align="center" variant="caption">a</Typography>
                            </Grid>
                            <Grid item md={5}>
                                <FormControl required fullWidth>
                                    <InputLabel id="compare-branch-field-label">Compare Branch</InputLabel>
                                    <Select variant="outlined" labelId="compare-branch-field-label"
                                            value={compareBranch} onChange={this.onChange("compareBranch")}>
                                        <MenuItem value="" disabled>Select compare branch</MenuItem>
                                        {branches.map((branch, key) => (
                                            <MenuItem disabled={branch.ref_name === baseBranch} key={key}
                                                      value={branch.ref_name}>{branch.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item={12}>
                                <FormControlLabel
                                    control={<Switch color={"primary"} onChange={this.onChange("useDefaultAuthor")}
                                                     value={useDefaultAuthor}/>}
                                    label="Usar Autor por defecto del repositorio"/>
                            </Grid>
                            {!useDefaultAuthor && (
                                <>
                                    <Grid item md={12}>
                                        <TextField
                                            label="Nombre del Autor"
                                            variant="outlined"
                                            required
                                            type="text"
                                            value={authorName}
                                            onChange={this.onChange("authorName")}
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField
                                            label="Email del Autor"
                                            variant="outlined"
                                            required
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
                                    <Select variant="outlined" labelId="status-field-label" value={status}
                                            onChange={this.onChange("status")}>
                                        <MenuItem value="" disabled>Select status</MenuItem>
                                        <MenuItem value={0}>Open</MenuItem>
                                        <MenuItem value={1}>Close</MenuItem>
                                        <MenuItem value={2}>Merged</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} alignContent="flex-end">
                                <Button variant="contained" color="primary" type="submit">
                                    Crear Pull Request
                                </Button>
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
};

export default withStyles(styles)(PRCreateView);
