import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProduct = async () => {
    if (!name || !price || !category || !company);
    {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:8000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
