import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:8000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate("/");
  };
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
