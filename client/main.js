import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './pages/Layout';

ReactDOM.render(<Router basename={'/'}>
    <Layout />
</Router>, document.getElementById('mount-point'));