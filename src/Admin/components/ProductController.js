import React, { useEffect, useState } from 'react';
import { getOrdered } from '../../firebase';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import ProductItem from './ProductItem';

function ProductController({url, handleItemClick, setProduct, brandList, typeList, setLoading}) {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [productList, setProductList] = useState([]);
    const [updated, setUpdated] = useState(false);
    
    useEffect(async () => {
        const products = await getOrdered("products", "created", "desc");
        setProductList(products);
        setPageCount(Math.ceil(products.length / pageSize));   
        setUpdated(false);     
    }, [page, updated]);

    const pageNavigation = (i) => {
        setPage(i);
    }

    const prevnextButton = (step) => {
        const target = step ? page + 1 : page - 1;
        if(target > 0 && target <= pageCount) {
            setPage(target);
        }
    }

    const editPage = (product) => {
        handleItemClick(null, { name : 'Edit'});
        setProduct(product);
    }

    const createPage = () => {
        handleItemClick(null, { name : 'Create'});
    }

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='9'>
                        <Button primary onClick={createPage}>Add Product</Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header>
                <Table.Row textAlign='center'>
                    <Table.HeaderCell textAlign='left'>Product Title</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Brand</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Final Price</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                    <Table.HeaderCell>Visible</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    productList.map((product) => {
                        return (
                            <ProductItem setLoading={setLoading} setUpdated={setUpdated} brandList={brandList} typeList={typeList} url={url} key={product.id} product={product} editPage={editPage}/>
                        );
                    })
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='9'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon disabled={page - 1 <= 0} onClick={() => prevnextButton(false)}>
                            <Icon name='chevron left' />
                        </Menu.Item>
                        {
                            [...Array(pageCount)].map((_, i) => {
                                return (
                                    <Menu.Item disabled={(i + 1) == page} key={i+1} onClick={e => pageNavigation(parseInt(e.target.innerHTML))}>
                                        {i + 1}
                                    </Menu.Item>
                                )
                            })
                        }
                        <Menu.Item as='a' icon disabled={page + 1 > parseInt(pageCount)} onClick={() => prevnextButton(true)}>
                            <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>     
        </Table>
    )
}

export default ProductController
