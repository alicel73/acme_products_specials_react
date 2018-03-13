import React, { Component } from 'react';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            isSpecial: false
        };
        this.onSave = this.onSave.bind(this);
        this.makeSpecial = this.makeSpecial.bind(this);
    
    }

    onSave(ev) {
        ev.preventDefault();
        this.props.makeSpec({
            id: this.state.id,
            name: this.state.name,
            isSpecial: this.state.isSpecial
        })
    }

    makeSpecial(ev) {
        ev.preventDefault();
        this.setState({ isSpecial: true});
        this.setState({ id: ev.target.value });
    }

    render() {
        const { name, isSpecial } = this.state;
        const { regularProducts, specialProducts } = this.props;
        const { onSave, makeSpecial } = this;
        console.log(this);
        console.log(this.state);
        return (
            <form onSubmit = { onSave }>
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