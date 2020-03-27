import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./App.css";
import _ from "lodash";
import employees from "./roster.json";

function App() {
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState("asc");
  const [filterBySalary, setFilterBySalary] = useState();
  const [filterByAge, setFilterByAge] = useState();
  let sortedEmployees = employees;
  if (sortBy) {
    sortedEmployees = _.sortBy(sortedEmployees, sortBy);
    if (sortDir === "desc") sortedEmployees = sortedEmployees.reverse();
  }
  if (filterBySalary)
    sortedEmployees = sortedEmployees.filter(
      employee => employee.salary >= 10000000
    );
  if (filterByAge)
    sortedEmployees = sortedEmployees.filter(employee => employee.age >= 30);

  const changeSort = field => {
    if (sortBy === field) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="container">
      <div className="text-center mx-auto d-block">
        <img
          src={`${process.env.PUBLIC_URL}/images/Los-Angeles-Dodgers-01.png`}
          alt="Dodgers"
          height="200px"
          width="200px"
        />
      </div>
      <div className="App text-center mb-5 d-flex flex-column align-center">
        <label className="font-weight-bold mb-3">
          Filter by salary above $10,000,000
          <input
            className="filterButton ml-2"
            type="checkbox"
            onChange={() => setFilterBySalary(prev => !prev)}
          />{" "}
        </label>
        <label className="font-weight-bold mb-3">
          Filter by age above 30
          <input
            className="filterButton ml-2"
            type="checkbox"
            onChange={() => setFilterByAge(prev => !prev)}
          />{" "}
        </label>
        <table className="rosterTable">
          <tr>
            <th onClick={() => changeSort("firstName")}>
              First Name
              <i className="fas fa-sort fa-xs"></i>
            </th>
            <th onClick={() => changeSort("lastName")}>
              Last Name<i className="fas fa-sort fa-xs"></i>
            </th>
            <th onClick={() => changeSort("position")}>
              Position<i className="fas fa-sort fa-xs"></i>
            </th>
            <th onClick={() => changeSort("salary")}>
              Salary<i className="fas fa-sort fa-xs"></i>
            </th>
            <th onClick={() => changeSort("age")}>
              Age<i className="fas fa-sort fa-xs"></i>
            </th>
          </tr>
          {sortedEmployees.map(employee => (
            <tr>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
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
    </div>
  );
}

export default App;
