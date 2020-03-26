import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import _ from "lodash";
import employees from "./employees.json";

function App() {
  const [sortBy, setSortBy] = useState();
  const [filterBy, setFilterBy] = useState();

  let sortedEmployees = employees;
  if (sortBy) sortedEmployees = _.sortBy(sortedEmployees, sortBy);
  if (filterBy)
    sortedEmployees = sortedEmployees.filter(
      employee => employee.salary >= 100000
    );

  return (
    <div className="App">
      <label>
        <input type="checkbox" onChange={() => setFilterBy(prev => !prev)} />{" "}
        Filter
      </label>
      <table>
        <tr>
          <th onClick={() => setSortBy("firstName")}>First Name</th>
          <th onClick={() => setSortBy("lastName")}>Last Name</th>
          <th onClick={() => setSortBy("role")}>Role</th>
          <th onClick={() => setSortBy("salary")}>Salary</th>
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
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
