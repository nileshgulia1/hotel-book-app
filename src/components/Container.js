import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import routes from '../routes';

const Contain = () => (
    <Router>
        <div>
            {renderRoutes(routes)}
        </div>
    </Router>
)
export default Contain