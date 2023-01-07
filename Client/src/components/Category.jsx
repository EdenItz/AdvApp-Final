import React from 'react';
import '../css/categoryCard.css';
import { getAllCategories } from '../services/categoryService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { errorMsg } from '../services/feedbackService';

function Category() {
    const [category, setCategory] = useState([]);
    React.useEffect(() => {
        getAllCategories()
            .then(result => {
                setCategory(result.data);
            })
            .catch(err => {
                errorMsg('Something went wrong! Please Try Again.');
            });
    }, []);
    return (
        <>
            <div className="container">
                <div className="cards">
                    {category.map(card => {
                        return (
                            <div className="categoryCard" key={card._id}>
                                <div className="imgBx">
                                    <img src={card.image} alt="" />
                                </div>
                                <div className="contextBx">
                                    <h3 className="categoryTitle">
                                        {card.name}
                                    </h3>
                                    <Link
                                        to={card.link}
                                        className="buy browseCat shiny"
                                    >
                                        Browse
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Category;
