import React, { useState } from "react";
import {
    Button,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Loader,
    Segment,
} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import PhotoUploadWidget from "./PhotoUploadWidget";
import ProductPhotoCarousel from "./ProductPhotoCarousel";
import {
    addProduct,
    getById,
    uploadPhoto,
    updateProduct,
    deletePhoto,
    set,
    getTimeStamp,
    db,
} from "../../firebase";

function ProductDetails({
    product = null,
    brandList,
    typeList,
    setActiveItem,
    activeItem,
    setProduct,
}) {
    const optionsType = typeList.map((type) => {
        return {
            key: type.id,
            text: type.title,
            value: type.title,
        };
    });

    const optionsBrand = brandList.map((brand) => {
        return {
            key: brand.id,
            text: brand.title,
            value: brand.title,
        };
    });

    const options = [
        { key: "1", text: "men", value: "men" },
        { key: "0", text: "women", value: "women" },
    ];

    const [name, setName] = useState((product && product.title) || "");
    const [price, setPrice] = useState((product && product.price) || 0);
    const [finalPrice, setFinalPrice] = useState(
        (product && product.finalPrice) || 0
    );
    const [description, setDescription] = useState(
        (product && product.description) || ""
    );
    const [type, setType] = useState((product && product.category) || "");
    const [brand, setBrand] = useState((product && product.brand) || "");
    const [gender, setGender] = useState(
        (product && product.gender.toLowerCase()) || ""
    );
    const [sizes, setSizes] = useState((product && product.sizes) || []);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        if (activeItem === "Edit") {
            updateProduct(product.id, {
                title: name,
                gender,
                description,
                price,
                finalPrice,
                isVisible: product.isVisible,
                onSale: product.onSale,
                photoUrls: product.photoUrls,
                brand,
                category: type,
                mainPhotoUrl: product.mainPhotoUrl,
                sizes,
                id: product.id,
                created: getTimeStamp(),
            });
            setLoading(false);
            setActiveItem("Products");
        } else if (activeItem === "Create") {
            addProduct({
                title: name,
                gender,
                description,
                price,
                finalPrice,
                isVisible: true,
                onSale: false,
                photoUrls: [],
                brand,
                category: type,
                mainPhotoUrl: "",
                sizes: [],
                created: getTimeStamp(),
            });
            setLoading(false);
            setActiveItem("Products");
        }
    };

    const [files, setFiles] = useState([]);

    const updateProductDetails = async () => {
        const prod = await getById("products", product.id);
        setProduct(prod);
    };

    const uploadPhotoToStorage = async (file) => {
        setLoading(true);

        await uploadPhoto(
            product.id,
            file,
            files[0].name,
            product.mainPhotoUrl
        );

        setLoading(false);
        setFiles([]);
        updateProductDetails();
    };

    const deletePhotoFromStorage = async (photoIndex) => {
        setLoading(true);
        await deletePhoto(
            product.id,
            product.photoUrls[photoIndex],
            product.mainPhotoUrl
        );
        setLoading(false);
        updateProductDetails();
    };

    const mainPhoto = async (link) => {
        setLoading(true);
        await set("products", product.id, { mainPhotoUrl: link });
        updateProductDetails();
        setLoading(false);
    };

    const handleChange = (value, index) => {
        // 1. Make a shallow copy of the items
        let items = [...sizes];
        // 2. Make a shallow copy of the item you want to mutate
        let item = items[index];
        // 3. Replace the property you're intested in
        item = value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy
        setSizes(items);
    };

    const deleteEntry = (index) => {
        const newSizes = [];

        sizes.forEach((size, i) => {
            if (index !== i) newSizes.push(size);
        });

        setSizes(newSizes);
    };

    const addSize = () => {
        setSizes([...sizes, ":"]);
    };

    const saveSize = () => {
        setLoading(true);
        db.collection("products")
            .doc(product?.id)
            .update({ sizes })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Header as="h1" dividing style={{ margin: "10px 0" }}>
                Product Details
            </Header>
            <Form onSubmit={handleSubmit} loading={loading}>
                <Form.Group>
                    <Form.Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Product Name"
                        placeholder="Product Name"
                        width={8}
                    />
                    <Form.Select
                        fluid
                        label="Type"
                        options={optionsType}
                        placeholder="Type"
                        width={4}
                        value={type}
                        onChange={(e) => setType(e.target.innerText)}
                    />
                    <Form.Select
                        fluid
                        label="Brand"
                        options={optionsBrand}
                        placeholder="Brand"
                        width={4}
                        value={brand}
                        onChange={(e) => setBrand(e.target.innerText)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        value={price == 0 ? "" : price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        type="number"
                        label="Price"
                        placeholder="Price"
                        width={3}
                    />
                    <Form.Input
                        value={finalPrice == 0 ? "" : finalPrice}
                        onChange={(e) =>
                            setFinalPrice(parseFloat(e.target.value))
                        }
                        type="number"
                        label="Final Price"
                        placeholder="Final Price"
                        width={3}
                    />
                    <Form.Select
                        fluid
                        label="Gender"
                        options={options}
                        placeholder="Gender"
                        width={2}
                        value={gender}
                        onChange={(e) => setGender(e.target.innerText)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        control={TextareaAutosize}
                        label="Description"
                        placeholder="Write product description here..."
                        width={8}
                    />
                </Form.Group>

                <Button positive type="submit" disabled={loading}>
                    Submit
                </Button>
            </Form>

            {product && (
                <>
                    <Header as="h1" dividing>
                        Available Sizes
                    </Header>
                    <Segment loading={loading}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button onClick={addSize} primary animated>
                                        <Button.Content visible>
                                            Add a size
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="add" />
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>Size</Grid.Column>
                                <Grid.Column width={3}>Quantity</Grid.Column>
                            </Grid.Row>
                            {sizes.map((size, index) => {
                                return (
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            <Input
                                                value={
                                                    sizes[index].split(
                                                        ":"
                                                    )[0] || ""
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        `${e.target.value}:${
                                                            sizes[index].split(
                                                                ":"
                                                            )[1] || ""
                                                        }`,
                                                        index
                                                    )
                                                }
                                                placeholder="Size"
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Input
                                                value={
                                                    parseInt(
                                                        sizes[index].split(
                                                            ":"
                                                        )[1]
                                                    ) || 0
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        `${
                                                            sizes[index].split(
                                                                ":"
                                                            )[0] || ""
                                                        }:${e.target.value}`,
                                                        index
                                                    )
                                                }
                                                type="number"
                                                placeholder="Quantity"
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button
                                                animated
                                                onClick={() =>
                                                    deleteEntry(index)
                                                }
                                                style={{
                                                    height: "38px",
                                                    marginTop: "auto",
                                                }}
                                            >
                                                <Button.Content visible>
                                                    Delete
                                                </Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="delete" />
                                                </Button.Content>
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                );
                            })}

                            <Grid.Row>
                                <Grid.Column>
                                    <Button
                                        positive
                                        disabled={loading}
                                        onClick={saveSize}
                                    >
                                        Save sizes
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Header as="h1" dividing>
                        Product Photos
                    </Header>

                    <PhotoUploadWidget
                        uploadPhoto={uploadPhotoToStorage}
                        files={files}
                        setFiles={setFiles}
                        loading={loading}
                    />

                    <Segment loading={loading}>
                        <ProductPhotoCarousel
                            photoLinks={product && product.photoUrls}
                            deletePhoto={deletePhotoFromStorage}
                            mainPhoto={mainPhoto}
                            mainPhotoUrl={product.mainPhotoUrl}
                        />
                    </Segment>
                </>
            )}
        </>
    );
}

export default ProductDetails;
