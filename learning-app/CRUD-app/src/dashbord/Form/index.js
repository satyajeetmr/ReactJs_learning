import React, { useEffect, useState } from "react";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userList, setUserList] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let localData = JSON.parse(localStorage.formData);
    setUserList(localData);
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      address: userAddress,
    };
    setUserList((prevUserList) => {
      const dataList = [...prevUserList, formData];
      localStorage.setItem("formData", JSON.stringify(dataList));
      return dataList;
    });
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setUserAddress("");
    setIsEdit(false);
  };
  // console.log("onSubmit--", userList);
  const handelEdit = (index) => {
    const editData = userList[index];
    setUserName(editData.name);
    setUserPhone(editData.phone);
    setUserEmail(editData.email);
    setUserAddress(editData.address);
    setIsEdit(true);
    let newData = JSON.parse(localStorage.formData);
    setUserList(() => {
      newData.splice(index, 1);
      const newDataList = [...newData];
      return newDataList;
    });
  };

  const handelDelete = (index) => {
    let deleteRow = JSON.parse(localStorage.formData);
    // console.log("delete row--", deleteRow);
    setUserList(() => {
      deleteRow.splice(index, 1);
      const deletedList = [...deleteRow];
      localStorage.setItem("formData", JSON.stringify(deletedList));
      // console.log("set new data row--", deleteRow);
      return deletedList;
    });
  };
  // console.log("after delete--", userList);

  return (
    <>
      <div className="container pt-5 pb-5">
        <form method="post">
          <div className="row">
            <div className="col-sm-6 form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="col-sm-6 form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control p-2"
                placeholder="Email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
            </div>
            <div className="col-sm-6 form-group">
              <label>Phone</label>
              <input
                type="number"
                className="form-control p-2"
                placeholder="Phone"
                value={userPhone}
                onChange={(event) => setUserPhone(event.target.value)}
              />
            </div>
            <div className="col-sm-6 form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Address"
                value={userAddress}
                onChange={(event) => setUserAddress(event.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </form>

        {userList && (
          <>
            <hr className="mt-5 mb-5" />
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
                {userList?.map((item, index) => (
                  <tr key={index}>
                    <th scope="col">{index}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handelEdit(index)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handelDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Form;
