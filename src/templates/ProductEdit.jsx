import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetSizeArea } from "../components/Products";
import ImageArea from "../components/Products/ImageArea";
import { TextInput, SelectBox, PrimaryButton } from "../components/Uikit";
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];
  if (id !== "") {
    id = id.split("/")[1];
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();

          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setImages(data.images);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: "tops", name: "Tops" },
    { id: "shirt", name: "Shirts" },
    { id: "pants", name: "Pants" },
  ];

  const genders = [
    { id: "all", name: "All" },
    { id: "male", name: "Man" },
    { id: "femal", name: "Woman" },
  ];
  return (
    <section>
      <h2 className="u-text__headline u-text-center">Product Edit</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"Product Name"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />

        <TextInput
          fullWidth={true}
          label={"Description"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={1}
          value={description}
          type={"text"}
        />

        <SelectBox
          label={"Category"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />

        <SelectBox
          label={"Gender"}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />

        <TextInput
          fullWidth={true}
          label={"Price"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />

        <div className="module-spacer--dedium" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--dedium" />
        <div className="center">
          <PrimaryButton
            label={"Save"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
