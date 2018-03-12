import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Products from './Products';

class App extends Component {
    constructor() {
        super();
        this.state = {
            regProducts: [],
            specProducts: []

        };
    }
    
    componentDidMount() {
        axios.get('/api/products')
            .then(result => result.data)
            .then(data => {
                this.setState({ regProducts: data[0], specProducts: data[1] })
            })
    }

    makeSpecial(product) {
        axios.post('/api/products/:id')
    }

    render() {
        const { regProducts, specProducts } = this.state;

        return (
            <Router>
                <div>
                    <h2> We have {specProducts.length} special products! </h2>
                    <Route path='/' exact render = { () => <Products regularProducts={ regProducts } specialProducts={ specProducts } /> } />

                </div>
            </Router>
        )
    }

}



export default App;