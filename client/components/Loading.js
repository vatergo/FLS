import React, { Component } from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';


class Loading extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CircularProgress size={50} />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
    },
};

export default withStyles(styles)(Loading);