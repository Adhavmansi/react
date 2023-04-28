import React, { useState } from "react";
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !contactNumber) {
      alert("Please fill all fields");
      return;
    }

    if (data.some((d) => d.name === `${firstName} ${lastName}`)) {
      alert("Person with the same name already exists");
      return;
    }

    setData([...data, { name: `${firstName} ${lastName}`, contactNumber }]);
    setFirstName("");
    setLastName("");
    setContactNumber("");
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setData(data.filter((d) => d.name !== name));
    }
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortAsc(!sortAsc);
    setData(sortAsc ? sortedData : sortedData.reverse());
  };

  const filteredData = data.filter((d) =>
    d.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="container">
        <h1>Contact list</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  placeholder="Enter contact number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th onClick={handleSort}>
                Name {sortAsc ? <>&uarr;</> : <
                              >&darr;</>
            }
          </th>
          <th>Contact Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={handleSearchNameChange}
              />
            </div>
          </td>
        </tr>
        {filteredData.length > 0 ? (
          filteredData.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.contactNumber}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(d.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No contacts found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default App;
