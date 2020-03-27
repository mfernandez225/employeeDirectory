import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import _ from "lodash";
import employees from "./roster.json";

function App() {
  const [sortBy, setSortBy] = useState();
  const [filterBy, setFilterBy] = useState();

  let sortedEmployees = employees;
  if (sortBy) sortedEmployees = _.sortBy(sortedEmployees, sortBy);
  if (filterBy)
    sortedEmployees = sortedEmployees.filter(
      employee => employee.salary >= 10000000
    );

  return (
    <div className="App text-center mb-5">
      <label className="font-weight-bold mb-3">
        Filter by salary above $10,000,000
        <input
          className="filterButton ml-2"
          type="checkbox"
          onChange={() => setFilterBy(prev => !prev)}
        />{" "}
      </label>
      <table className="rosterTable">
        <tr>
          <th onClick={() => setSortBy("firstName")}>
            First Name<i className="fas fa-sort fa-xs"></i>
          </th>
          <th onClick={() => setSortBy("lastName")}>
            Last Name<i className="fas fa-sort fa-xs"></i>
          </th>
          <th onClick={() => setSortBy("role")}>
            Position<i className="fas fa-sort fa-xs"></i>
          </th>
          <th onClick={() => setSortBy("salary")}>
            Salary<i className="fas fa-sort fa-xs"></i>
          </th>
          <th onClick={() => setSortBy("age")}>
            Age<i className="fas fa-sort fa-xs"></i>
          </th>
        </tr>
        {sortedEmployees.map(employee => (
          <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.role}</td>
            <td>
              <NumberFormat
                value={employee.salary}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
              />
            </td>
            <td>{employee.age}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
