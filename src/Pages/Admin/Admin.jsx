import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Admin.scss';

import { addProductStart, fetchProductsStart, deleteProductStart } from './../../store/Actions/products.actions';
import Modal from './../../components/Modal/Modal';
import FormInput from './../../components/Forms/FormInput/FormInput';
import FormSelect from './../../components/Forms/FormSelect/FormSelect';
import Button from './../../components/Forms/Button/Button';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const Admin = props => {
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    }, [dispatch]);

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('mens');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        );
        resetForm();
    }


    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add New Product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>Add New Product</h2>

                        <FormSelect
                            label="Category"
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value: "womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                            label="name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput
                            label="Main Image URL"
                            type="url"
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <FormInput
                            label="price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">Add Product</Button>
                    </form>
                </div>
            </Modal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>Manage Products</h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellSpacing="4" cellPadding="0">
                                    <tbody>
                                        {products.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID
                                            } = product;

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className="thumb" src={productThumbnail} alt="Product" />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ${productPrice}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;