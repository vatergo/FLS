import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@material-ui/core';

class Info extends Component {
    render() {
        const { webstorm, goland, idea } = this.props.data;
        return (
            <>
                <TableContainer component={Paper} variant="outlined" >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Min usage per day</TableCell>
                                <TableCell align="right">Max usage per day</TableCell>
                                <TableCell align="right">Average usage per day</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>WebStorm</TableCell>
                                <TableCell align="right">{webstorm.min}</TableCell>
                                <TableCell align="right">{webstorm.max}</TableCell>
                                <TableCell align="right">{webstorm.avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>GoLand</TableCell>
                                <TableCell align="right">{goland.min}</TableCell>
                                <TableCell align="right">{goland.max}</TableCell>
                                <TableCell align="right">{goland.avg}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>IntelliJ IDEA</TableCell>
                                <TableCell align="right">{idea.min}</TableCell>
                                <TableCell align="right">{idea.max}</TableCell>
                                <TableCell align="right">{idea.avg}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default Info;