import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { getFilteredProducts } from '../services/productsService';

const MainProductFilter = ({ setProducts }) => {
    const [filter, setFilter] = useState({
        productName: '',
        productCategory: '',
        productInStock: '',
    });

    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSelect = (e, type) => {
        let isFilterUsed =
            selectedTags.findIndex(
                selected => selected.value === e.target.value,
            ) !== -1;
        let isProductInStockTypeIsUsed =
           selectedTags.findIndex(selected => selected.type === type) !== -1;
        if (!isFilterUsed && !isProductInStockTypeIsUsed) {
            setFilter({ ...filter, [e.target.name]: e.target.value });
            setSelectedTags([...selectedTags, { type, value: e.target.value }]);
        }
    };

    const handleRemoveTag = index => {
        setSelectedTags(selectedTags.filter((tag, i) => i !== index));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Perform submit logic here
        const { productCategory, productName, productInStock } = filter;

        let products = await getFilteredProducts(
            productCategory,
            productName,
            productInStock,
        );

        setProducts(products.data.allProducts);
        setFilter({
            productName: '',
            productCategory: '',
            productInStock: '',
        });
        // setSelectedTags([]);
    };

    return (
        <Container>
            <Row>
                {selectedTags.map((tag, index) => (
                    <Col key={index} className="d-flex align-items-center mb-2">
                        <Button variant="outline-secondary" className="mr-2">
                            {tag.type}: {tag.value}
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => handleRemoveTag(index)}
                        >
                            x
                        </Button>
                    </Col>
                ))}
            </Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productFilter">
                    <Row style={{ width: '100%' }}>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Search by product name"
                                name="productName"
                                value={filter.productName}
                                onChange={handleChange}
                                className="mr-2"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                name="productCategory"
                                value={filter.productCategory}
                                onChange={e => handleSelect(e, 'category')}
                                className="mr-2"
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Kids">Kids</option>
                                <option value="Shoes&Bags">Shoes & Bags</option>
                                <option value="Accessories">Accessories</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="select"
                                name="productInStock"
                                value={filter.productInStock}
                                onChange={e =>
                                    handleSelect(e, 'productInStock')
                                }
                                className="mr-2"
                            >
                                <option value="" disabled>
                                    In stock
                                </option>
                                <option value="true">Only in Stock</option>
                                <option value="false">All products</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <div>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default MainProductFilter;
