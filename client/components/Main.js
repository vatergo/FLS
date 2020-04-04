import React, { Component } from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import Loading from './Loading';
import Chart from './Chart';
import Table from './Table';
import Tools from './Tools';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            period: 'quarter',
            selectedPeriod: 0,
            loading: true,
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
                loading: false,
            }))
            .catch((er) => console.error(er));
    }

    onClickPrevPeriod() {
        this.setState({ selectedPeriod: this.state.selectedPeriod - 1 });
    }

    onClickNextPeriod() {
        this.setState({ selectedPeriod: this.state.selectedPeriod + 1 });
    }

    onChangePeriod({ target }) {
        this.setState({ period: target.value });
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        const { data, period, selectedPeriod } = this.state;
        const { classes } = this.props;

        return (
            <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
                <Typography variant="h4" gutterBottom>Stats</Typography>
                <Typography variant="h6" gutterBottom>
                    From {data[selectedPeriod].data[0].timestamp} through {data[selectedPeriod].data[data[selectedPeriod].data.length - 1].timestamp}
                </Typography>
                <Grid className={classes.item} item>
                    <Tools
                        period={period}
                        disabledPrev={selectedPeriod <= 0}
                        disabledNext={selectedPeriod >= data.length - 1}
                        onClickPrevPeriod={this.onClickPrevPeriod.bind(this)}
                        onClickNextPeriod={this.onClickNextPeriod.bind(this)}
                        onChangePeriod={this.onChangePeriod.bind(this)} />
                </Grid>
                <Grid className={classes.item} item>
                    <Table data={data[selectedPeriod]} />
                </Grid>
                <Grid className={classes.item} item>
                    <Chart
                        data={data[selectedPeriod] ? data[selectedPeriod].data : []}
                        xaxisKey='timestamp'
                        barKey='webstorm'
                        color='#A60000' />
                </Grid>
                <Grid className={classes.item} item>
                    <Chart
                        data={data[selectedPeriod] ? data[selectedPeriod].data : []}
                        xaxisKey='timestamp'
                        barKey='goland'
                        color='#006363' />
                </Grid>
                <Grid className={classes.item} item>
                    <Chart
                        data={data[selectedPeriod] ? data[selectedPeriod].data : []}
                        xaxisKey='timestamp'
                        barKey='idea'
                        color='#679B00' />
                </Grid>
            </Grid >
        );
    }
}

const styles = {
    root: {
        padding: 15,
    },
    item: {
        width: '80%',
        marginTop: 15,
    },
};

export default withStyles(styles)(Main);
