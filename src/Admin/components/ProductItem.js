import React, { useState } from "react";
import { Checkbox, Icon, Label, Table } from "semantic-ui-react";
import { deleteDocument, set } from "../../firebase";

function ProductItem({
    product,
    editPage,
    brandList,
    typeList,
    setUpdated,
    setLoading,
}) {
    const [checked, setChecked] = useState(product.isVisible);

    const deleteProduct = async () => {
        setLoading(true);
        await deleteDocument("products", product.id);
        setUpdated(true);
        setLoading(false);
    };

    const Visible = async () => {
        setLoading(true);
        await set("products", product.id, { isVisible: !product.isVisible });
        setUpdated(true);
        setLoading(false);
    };

    return (
        <Table.Row key={product.id}>
            <Table.Cell>
                <Label ribbon>{product.title}</Label>
            </Table.Cell>
            <Table.Cell textAlign="center">
                {product.gender.toLowerCase() == "men" ? "M" : "W"}
            </Table.Cell>
            <Table.Cell textAlign="center">{product.brand}</Table.Cell>
            <Table.Cell textAlign="center">{product.category}</Table.Cell>
            <Table.Cell textAlign="center">
                {
                    product.sizes.length > 0
                        ? Object.values(product.sizes).length != 0
                            ? Object.values(product.sizes).length > 1 
                                ? Object.values(product.sizes).reduce(
                                    (a, b) =>
                                        parseInt(a.split(":")[1]) +
                                        parseInt(b.split(":")[1])
                                ) : Object.values(product.sizes)[0]?.split(":")[1]
                            : 0
                        : 0
                }
            </Table.Cell>
            <Table.Cell textAlign="center">{product.finalPrice}</Table.Cell>
            <Table.Cell textAlign="center">
                <Icon
                    link
                    name="edit outline"
                    color="blue"
                    onClick={() => editPage(product)}
                />
            </Table.Cell>
            <Table.Cell textAlign="center">
                <Icon link name="close" color="red" onClick={deleteProduct} />
            </Table.Cell>
            <Table.Cell collapsing>
                <Checkbox
                    slider
                    checked={checked}
                    onChange={() => {
                        setChecked(!checked);
                        Visible();
                    }}
                />
            </Table.Cell>
        </Table.Row>
    );
}

export default ProductItem;
