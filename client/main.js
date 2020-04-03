import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';

ReactDOM.render(<Router basename={'/'}>
    <Main />
</Router>, document.getElementById('mount-point'));