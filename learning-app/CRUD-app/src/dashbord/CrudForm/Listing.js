import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listing = () => {
  const [listData, setListData] = useState([]);
  async function getData() {
    axios
      .get("https://669929182069c438cd717cfd.mockapi.io/api/crud/v1/loginData")
      .then(function (response) {
        setListData(response.data);
      });
  }
  const handelDelete = (id) => {
    axios
      .delete(
        `https://669929182069c438cd717cfd.mockapi.io/api/crud/v1/loginData/${id}`
      )
      .then(function (response) {
        getData();
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container pt-4 pb-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listData?.map((item) => (
              <tr key={item.id}>
                <th scope="col">{item.id}</th>
                <td>{item.userName}</td>
                <td>{item.userEmail}</td>
                <td>{item.userPhone}</td>
                <td>{item.userAddress}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary btn-sm"
                    to={`/crud-form/${item.id}`}
                  >
                    Edit
                  </Link>{" "}
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handelDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Listing;
