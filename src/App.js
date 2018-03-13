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
        this.makeSpec = this.makeSpec.bind(this);
        this.makeRegular = this.makeRegular.bind(this);
    }
    
    componentDidMount() {
        axios.get('/api/products')
            .then(result => result.data)
            .then(data => {
                this.setState({ regProducts: data[0], specProducts: data[1] })
            })
    }

    makeSpec(product) {
        axios.put(`/api/products/${product.id}`, product)
            .then (result => result.data)
            .then (product => {
                let specProducts = this.state.specProducts;
                let regProducts = this.state.regProducts;
                specProducts = [...this.state.specProducts, product];
                regProducts = regProducts.filter(treat =>treat.id !== product.id)
                this.setState({ specProducts, regProducts })
            })
    }

    makeRegular(product) {
        axios.put(`/api/products/${product.id}`, product)
        .then (result => result.data)
        .then (product => {
            let specProducts = this.state.specProducts;
            let regProducts = this.state.regProducts;
            regProducts = [...this.state.regProducts, product];
            specProducts = specProducts.filter(treat =>treat.id !== product.id)
            this.setState({ specProducts, regProducts })
        })
    }

    render() {
        const { regProducts, specProducts } = this.state;
        const { makeSpec, makeRegular } = this;

        return (
            <Router>
                <div>
                    <h2> We have {specProducts.length} special products! </h2>
                    <Route path='/' exact render = { () => <Products regularProducts={ regProducts } specialProducts={ specProducts } makeSpec={ makeSpec } makeRegular={ makeRegular } /> } />

                </div>
            </Router>
        )
    }

}



export default App;