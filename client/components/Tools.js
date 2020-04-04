import React, { Component } from 'react';
import { Grid, TextField, MenuItem, Button, withStyles } from '@material-ui/core';

class Tools extends Component {
    render() {
        const {
            classes, period, disabledPrev, disabledNext,
            onClickPrevPeriod, onClickNextPeriod, onChangePeriod,
        } = this.props;
        return (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Button
                    disabled={disabledPrev}
                    onClick={onClickPrevPeriod}>
                    Prev {period}
                </Button>
                <TextField
                    className={classes.textfield}
                    variant="outlined"
                    onChange={onChangePeriod}
                    label="Period"
                    value={period}
                    select>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                </TextField>
                <Button
                    disabled={disabledNext}
                    onClick={onClickNextPeriod}>
                    Next {period}
                </Button>
            </Grid>
        );
    }
}

const styles = {
    textfield: {
        width: '50%',
        margin: '0 15px',
    },
};

export default withStyles(styles)(Tools);