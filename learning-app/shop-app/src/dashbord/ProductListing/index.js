import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState("");

  async function getProducts() {
    axios.get("https://fakestoreapi.com/products").then(function (res) {
      if (res?.status === 200) {
        setProducts(res.data);
      }
    });
  }

  useEffect(() => {
    getProducts();
  }, []);
  // console.log("product", products);
  return (
    <>
      <div className="container pt-5 pb-5">
        <h2 className="mb-4">Product Listing</h2>

        <div className="row product">
          {products &&
            products?.map((product) => (
              <div className="col-sm-6 col-md-4 mb-5" key={product.id}>
                <div className="card p-3 d-flex flex-wrap flex-column justify-content-between h-100">
                  <div className="card-content">
                    <div className="product-img text-center mb-4">
                      <img src={product?.image} alt={product?.title} />
                    </div>
                    <div className="block mb-2">
                      Category:{" "}
                      <span className="text-primary">
                        {product?.category}
                      </span>
                    </div>
                    <h5 className="mb-3">{product.title}</h5>
                    <h6 className="mb-3">
                      Price:{" "}
                      <span className="text-success font-weight-bold">
                        ${product.price}
                      </span>
                    </h6>
                    <div className="mb-3">
                      Product Rating:{" "}
                      <span className="text-primary ">
                        {product?.rating?.rate} ({product?.rating?.count})
                      </span>
                    </div>
                  </div>
                  <div className="btn-wrap d-flex flex-wrap gap-10p justify-content-between">
                    <Link
                      to={`/products/single/${product.id}`}
                      className="btn btn-secondary"
                    >
                      View Details
                    </Link>
                    <button type="button" className="btn btn-primary pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
