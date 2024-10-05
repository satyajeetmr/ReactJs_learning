import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [similarProduct, setSimilarProduct] = useState();

  async function getProductData() {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(function (res) {
      //   console.log("main-data", res);
      if ((res.status = 200)) {
        setSingleProduct(res.data);
      }
    });
  }

  async function getSimilarProductData() {
    console.log("categoryName", singleProduct?.category);
    axios
      .get(
        `https://fakestoreapi.com/products/category/${singleProduct?.category}`
      )
      .then(function (catRes) {
        // console.log("cat-data", catRes);
        if ((catRes.status = 200)) {
          setSimilarProduct(catRes.data);
        }
      });
  }

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    getSimilarProductData();
  }, [singleProduct]);

  //   console.log("similar-product--", similarProduct);
  return (
    <>
      <div className="container pt-4 pb-5">
        {singleProduct && (
          <div className="row">
            <div className="col-md-5">
              <div className="card p-3">
                {singleProduct?.image && (
                  <img
                    src={singleProduct?.image}
                    alt={singleProduct?.title}
                    width="100%"
                  />
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="card p-3">
                <span className="block mb-2">
                  Category:{" "}
                  <span className="text-primary">{singleProduct.category}</span>
                </span>
                <h4 className="mb-3">{singleProduct?.title}</h4>
                <h6 className="mb-3">
                  Price:{" "}
                  <span className="text-success font-weight-bold">
                    ${singleProduct?.price}
                  </span>
                </h6>
                <div className="mb-4">
                  Product Rating:{" "}
                  <span className="text-primary ">
                    {singleProduct.rating.rate} ({singleProduct.rating.count})
                  </span>
                </div>
                <div className="d-flex flex-wrap gap-10p mb-4">
                  <button className="btn btn-outline-success btn-long cart">
                    Add to Cart
                  </button>
                  <button className="btn btn-primary btn-long buy">
                    Buy it Now
                  </button>
                </div>
                <hr />
                {singleProduct?.description && (
                  <div className="product-description text-dark mt-2">
                    <span className="font-weight-bold block">Description</span>
                    <p>{singleProduct?.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {similarProduct && (
          <div className="mt-5">
            <h2 className="mb-3">Similar items:</h2>
            <div className="similar-products mt-2 d-flex row">
              {similarProduct?.map((item) => (
                <div className="col-md-6 col-lg-3 mb-5" key={item.id}>
                  <div className="card p-2 d-flex flex-wrap flex-column justify-content-between h-100">
                    <div className="card-content">
                      <div className="product-img text-center mb-4">
                        <img src={item?.image} alt={item?.title} />
                      </div>
                      <div className="block mb-2">
                        Category:{" "}
                        <span className="text-primary">{item?.category}</span>
                      </div>
                      <h5 className="mb-3">{item.title}</h5>
                      <h6 className="mb-3">
                        Price:{" "}
                        <span className="text-success font-weight-bold">
                          ${item.price}
                        </span>
                      </h6>
                      <div className="mb-3">
                        Product Rating:{" "}
                        <span className="text-primary ">
                          {item?.rating?.rate} ({item?.rating?.count})
                        </span>
                      </div>
                    </div>
                    <div className="btn-wrap d-flex flex-wrap gap-10p justify-content-between">
                      <Link
                        to={`/products/single/${item.id}`}
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
        )}
      </div>
    </>
  );
};

export default SingleProduct;
