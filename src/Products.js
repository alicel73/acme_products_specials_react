import React, { Component } from 'react';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            name: '',
            isSpecial: false
        };
        this.makeSpecial = this.makeSpecial.bind(this);

    }

    makeSpecial(ev) {
        this.setState({ isSpecial: true });
        this.setState({ value: ev.target.value});
    }

    render() {
        const { name, isSpecial } = this.state;
        const { makeSpecial } = this;
        const { regularProducts, specialProducts } = this.props;
        console.log(this)
        console.log(this.state)
        return (
            <form>
                <h3> Regular Products </h3>
                <select value = { name } onChange = { makeSpecial } >
                    <option value = ''>-- choose --</option>
                    {
                        regularProducts.map(product => {
                            return (
                                <option key = { product. id } value = { product.id }> { product.name } </option>
                            )
                        })
                    }

                </select>
                <button>Make Special</button>

                <br />
                <br />
                
                <h3> Special Products </h3>
                <select value = { name } >
                    <option value = ''>-- choose --</option>
                    {
                        specialProducts.map(product => {
                            return (
                                <option key = { product. id } value = { product.id }> { product.name } </option>
                            )
                        })
                    }

                </select>
                <button>Make Regular</button>
            </form>
        )
    }
}

export default Products;