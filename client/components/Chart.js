import React, { Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Chart extends Component {
    render() {
        const { data, xaxisKey, barKey, color } = this.props;
        return (
            <BarChart
                width={1024}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xaxisKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={barKey} fill={color} />
            </BarChart>
        );
    }
}

export default Chart;