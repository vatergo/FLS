import React, { Component } from 'react';
import { Grid, TextField, MenuItem, Button } from '@material-ui/core';
import axios from 'axios';
import Chart from './Chart';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            period: 'quarter',
            selectedPeriod: 0,
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.period !== this.state.period) {
            this.loadData();
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get(`/api/${this.state.period}`)
            .then((result) => this.setState({
                data: result.data,
                selectedPeriod: 0,
            }))
            .catch((er) => console.error(er));
    }

    render() {
        const { data, period, selectedPeriod } = this.state;
        return (
            <Grid container direction='column' justify='center' alignItems='center'>
                <Button 
                    disabled={selectedPeriod <= 0}
                    onClick={() => this.setState({ selectedPeriod: this.state.selectedPeriod - 1 })}>
                    Prev {period}
                </Button>
                <TextField
                    onChange={({ target }) => this.setState({ period: target.value })}
                    label="Period"
                    value={period}
                    select>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                </TextField>
                <Button 
                disabled={selectedPeriod >= data.length - 1}
                onClick={() => this.setState({ selectedPeriod: this.state.selectedPeriod + 1 })}>
                    Next {period}
                </Button>
                <Chart data={data[selectedPeriod]} xaxisKey='timestamp' barKey='webstorm' color='#A60000' />
                <Chart data={data[selectedPeriod]} xaxisKey='timestamp' barKey='goland' color='#006363' />
                <Chart data={data[selectedPeriod]} xaxisKey='timestamp' barKey='idea' color='#679B00' />
            </Grid>
        );
    }
}

export default Main;
