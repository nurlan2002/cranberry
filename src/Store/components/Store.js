import React, { useEffect, useState } from 'react';
import '../css/Store.css';
import Product from './Product';
import { Fragment } from 'react';
import { Slider } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { get, fireSQL } from '../../firebase';
import { useStateValue } from '../../StateProvider';

function Store({gender}) {
    const [{}, dispatch] = useStateValue();

    const [productList, setProductList] = useState([]);
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [value, setValue] = useState([0, 0]);

    useEffect( async() => {
        dispatch({
            type: "SET_LOADING",
            loading: true
        });
        const products = await get("products", "gender", "==", gender.toLowerCase());
        const newBrands = await get("brands");
        const newTypes = await get("category");
        let min = 1000000;
        products.forEach((pr) => {
            if(pr.finalPrice < min) {
                min = pr.finalPrice;
            }
        });
        setMinPrice(min);
        let max = min;
        products.forEach((pr) => {
            if(pr.finalPrice > max) {
                max = pr.finalPrice;
            }
        });
        setMaxPrice(max);
        setValue([min, max]);
        setTypes(newTypes);
        setBrands(newBrands);
        setProductList(products);
        dispatch({
            type: "SET_LOADING",
            loading: false
        });
    }, [gender]);

    const add = (array, obj) => {
        return [...array, obj];
    }

    const remove = (array, obj) => {
        const index = array.findIndex(
            (item) => item === obj
          );
          let newArray = [...array];
    
          if (index >= 0) 
            newArray.splice(index, 1);

        return newArray;
    };

    const toggleCriteria = (checked, name, T) => {
        if(T === "type") {
            if(checked) {
                setSelectedTypes(add(selectedTypes, name));
            }
            else {
                setSelectedTypes(remove(selectedTypes, name));
            }
        }
        else if(T === "brand") {
            if(checked) {
                setSelectedBrands(add(selectedBrands, name));
            }
            else {
                setSelectedBrands(remove(selectedBrands, name));
            }
        }
    }

    useEffect(() => {

        var sqlQuery = `SELECT * FROM products WHERE gender = '${gender.toLowerCase()}'`;

        if(selectedTypes.length > 0) {
            var categoryQuery = "('" + selectedTypes.join("','") + "')";
            sqlQuery += ` AND category IN ${categoryQuery}`;
        }

        if(selectedBrands.length > 0) {
            var brandQuery = "('" + selectedBrands.join("','") + "')";
            sqlQuery += ` AND brand IN ${brandQuery}`;
        }

        sqlQuery += ` AND (finalPrice >= ${value[0]} AND finalPrice <= ${value[1]})`

        // console.log(sqlQuery);

        fireSQL.query(sqlQuery).then(documents => {
            setProductList(documents);
        });
        

    }, [selectedTypes, selectedBrands, value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="store">
            <p className="store__header">{gender} Collection</p>

            <div className="store__info"> 
                <div className="store__info-options">
                    <span className="store__info-option-filter" onClick={() => document.querySelector(".store__categories").classList.toggle("visible")}><FilterListIcon style={{ fontSize: 30 }}/></span>
                </div>
            </div>

            <div className="store__main">
                <div className="store__categories">
                    <details>
                        <summary>
                            <span className="summary-title">Categories</span>
                            <div className="summary-chevron-up">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </summary>

                        <div className="summary-content">
                        <div className="boxes">
                            {
                                types && types.map((type) => {
                                    return (
                                        <Fragment key={type.id}>
                                            <input type="checkbox" id={`box-${type.id}`} onChange={e => toggleCriteria(e.target.checked, type.title, "type")} />
                                            <label htmlFor={`box-${type.id}`}>{type.title}</label>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                            
                        </div>
                        <div className="summary-chevron-down">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </div>    
                    </details>

                    <details>
                        <summary>
                            <span className="summary-title">Brands</span>
                            <div className="summary-chevron-up">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </summary>

                        <div className="summary-content">
                        <div className="boxes">
                            {
                                brands && brands.map((brand) => {
                                    return (
                                        <Fragment key={brand.id}>
                                            <input type="checkbox" id={`box-${brand.id}`} onChange={e => toggleCriteria(e.target.checked, brand.title, "brand")}/>
                                            <label htmlFor={`box-${brand.id}`}>{brand.title}</label>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                            
                        </div>
                        <div className="summary-chevron-down">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </div>    
                    </details>

                    <details>
                        <summary>
                            <span className="summary-title">Price Range</span>
                            <div className="summary-chevron-up">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </summary>

                        <div className="summary-content">
                            <div style={{padding: "10px 20px"}}>
                                <Slider
                                    max={maxPrice}
                                    min={minPrice}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    style={{color: '#58AFBD'}}
                                />
                            </div>                           
                            
                        </div>
                        <div className="summary-chevron-down">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </div>    
                    </details>

                    {/* <details>
                        <summary>
                            <span className="summary-title">Sort</span>
                            <div className="summary-chevron-up">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </summary>

                        <div className="summary-content">
                            <div style={{padding: "0px 15px"}}>
                                <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={handleSelect}>
                                    <FormControlLabel className="radio-label" value="name" control={<Radio color="primary" style={{color: "#0f0f0f"}} />} label="Title"/>
                                    <FormControlLabel className="radio-label" value="asc" control={<Radio color="primary" style={{color: "#0f0f0f"}}/>} label="Price Low To High" />
                                    <FormControlLabel className="radio-label" value="desc" control={<Radio color="primary" style={{color: "#0f0f0f"}}/>} label="Price High To Low" />
                                </RadioGroup>
                            </div>                            
                        </div>
                        <div className="summary-chevron-down">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </div>    
                    </details> */}
                </div>

                <div className="store__products">
                    <ul className="store__products-grid">
                        {
                            productList.map((product) => {
                                return product.isVisible && <li key={product.id} ><Product product={product}/></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Store
