import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  // const [searchText, setSearchText] = useState("");
  const [productListData, setProductListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [recordLength, setRecordLength] = useState();

  async function getProducts() {
    axios.get("https://fakestoreapi.com/products").then(function (res) {
      if (res?.status === 200) {
        // setProducts(res.data);
        setProductListData(res.data);
        // setProductLength(res.data.length);
        // console.log("data-length", res.data.length);
      }
    });
  }

  function getCurrentRecords(productList) {
    const indexOfLastRecord = currentPage * postsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - postsPerPage;
    const current = productList?.slice(indexOfFirstRecord, indexOfLastRecord);
    console.log("pag currentPageNo--------", currentPage);
    console.log("pag currentData--------", current);
    setCurrentRecords(current);
    setProducts(current);
    console.log("pag currentRecords-----", currentRecords);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCurrentRecords(productListData);
    setRecordLength(productListData.length);
  }, [productListData, currentPage]);


  // console.log("change", productListData);
  const changeHandler = (e) => {
    if (e.target.value) {
      // console.log("searchText", productListData);
      let filterData = productListData?.filter(
        (curVal) =>
          curVal.title.toLowerCase().includes(e.target.value) ||
          curVal.category.toLowerCase().includes(e.target.value)
      );
      // setProducts(filterData);
      setCurrentPage(1);
      setRecordLength(filterData.length);
      getCurrentRecords(filterData);
      console.log("search recordFilter--------", filterData);
    } else {
      console.log("search handleChange--------", currentRecords);
      setProducts(currentRecords);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    // getCurrentRecords();
    // console.log("pageNumber++", pageNumber);
    console.log("pagin currentRecords-----", currentRecords);
  };

  const handelSelect = (e) => {
    const selectedVal = e.target.value;
    // console.log('selectVal', e.target.value);
    if (selectedVal === 'lowtohigh') {
      const lowtohigh = products.sort((a, b) => a.price - b.price);
      console.log('lowtohigh', lowtohigh);
      return setProducts([...lowtohigh]);

    } else if (selectedVal === 'hightolow') {
      const hightolow = products.sort((a, b) => b.price - a.price);
      console.log('hightolow', hightolow);
      return setProducts([...hightolow]);
    } else {
      console.log('defaultData', currentRecords);
      const resetList = currentRecords;
      console.log("select currentRecords-----", currentRecords);
      return setProducts([...resetList]);
    }
  }

  console.log("outside currentRecords-----", currentRecords);

  return (
    <>
      <div className="container pt-5 pb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <h2 className="mb-4">Product Listing</h2>
          <div className="mb-4 d-flex gap-10p">
            <select className="custom-select selectWidth" onChange={handelSelect}>
              <option value="default">Default</option>
              <option value="lowtohigh">Low to High</option>
              <option value="hightolow">High to Low</option>

            </select>
            <input
              type="text"
              name="search"
              className="p-2 form-control"
              // value={searchText}
              placeholder="Search here"
              onChange={changeHandler}
            />
          </div>
        </div>

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
                      <span className="text-primary">{product?.category}</span>
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
                      to={`/products/single?id=${product.id}`}
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
        <div className="d-flex justify-content-center">
          <Pagination length={recordLength} postsPerPage={postsPerPage} handlePagination={handlePagination} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default ProductListing;
