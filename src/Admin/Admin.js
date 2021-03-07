import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom'
import AdminNav from './components/AdminNav';
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
import ProductController from './components/ProductController';
import ProductDetails from './components/ProductDetails';
import { auth, get } from '../firebase'
import { useStateValue } from '../StateProvider';

function Admin() {
    const url = "https://localhost:5001";
    const history = useHistory();

    const [activeItem, setActiveItem] = useState('Dashboard');
    const [product, setProduct] = useState(null);
    const [brandList, setBrandList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [{ user }, dispatch] = useStateValue();

    const handleItemClick = (e = null, { name }) => {
        setActiveItem(name);        
    }

    useEffect(() => {
        // if(auth.currentUser === null) {
        //     history.replace("/account");
        // }
        // else {
            import('semantic-ui-css/semantic.min.css');
        // }        
    }, [user]);

    useEffect(async () => {
        const brands = await get("brands");
        setBrandList(brands);    
        const types = await get("category");
        setTypeList(types);
    }, [loading]);

    return (
        <div className="admin">
            <Container style={{marginTop:'30px'}}>
                <AdminNav activeItem={activeItem} setActiveItem={setActiveItem} handleItemClick={handleItemClick} /> 
                <Segment>
                    <Route exact path="/admin/create">
                        <ProductDetails activeItem={activeItem} url={url} setActiveItem={setActiveItem} brandList={brandList} typeList={typeList}/> 
                    </Route>
                    <Route exact path="/admin/edit">
                        <ProductDetails handleItemClick={handleItemClick} setProduct={setProduct} activeItem={activeItem} url={url} setActiveItem={setActiveItem} product={product} brandList={brandList} typeList={typeList}/> 
                    </Route>
                    <Route exact path="/admin/products">
                        <Dimmer active={loading} inverted>
                            <Loader />
                        </Dimmer>
                        <ProductController setLoading={setLoading} url={url} handleItemClick={handleItemClick} setProduct={setProduct} brandList={brandList} typeList={typeList}/>
                    </Route>
                </Segment>
            </Container>
        </div>
    )
}

export default Admin
