import React, { Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

class Chart extends Component {
    render() {
        const { data, xaxisKey, barKey, color } = this.props;
        return (
            <ResponsiveContainer width='100%' height={300}>
                <BarChart
                    data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xaxisKey} />
                    <YAxis label={{ value: 'License Usage', offset: 0, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Bar dataKey={barKey} fill={color} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default Chart;