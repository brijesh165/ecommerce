import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from './../../store/Actions/products.actions';
import FormSelect from './../Forms/FormSelect/FormSelect';
import Product from './Product/Product';

import './ProductResults.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { products } = useSelector(mapState);
    const { filterType } = useParams();

    useEffect(() => {
        dispatch(fetchProductsStart({filterType}))
    }, [dispatch, filterType]);

    if (Array.isArray(products)) return null;

    if (products.length < 1) {
        return (
            <div className="products">
                <p>No Search Results!</p>
            </div>
        )
    }

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Mens',
            value: 'mens'
        }, {
            name: 'Womens',
            value: 'womens'
        }],
        handleChange: handleFilter
    };

    return (
        <div className="products">
            <h1>Browse Products</h1>

            <FormSelect {...configFilters} />
            <div className="productResults">
                {products.map((product, pos) => {
                    console.log(product, pos)
                    const { productThumbnail, productName, productPrice } = product;
                    console.log(productThumbnail, productPrice, productName);
                    if (!productThumbnail || !productName || typeof productPrice === "undefined") return null;

                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice
                    };

                    return (
                        <Product {...configProduct} />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductResults;