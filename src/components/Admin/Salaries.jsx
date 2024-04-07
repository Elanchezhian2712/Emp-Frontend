import React, { useEffect, useState } from "react";
import { getEmployees, getLeaders, viewAllSalaries } from "../../http";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import HeaderSection from "../../components/HeaderSection";

const Salaries = () => {
  const history = useHistory();
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await getEmployees();
        const leadersResponse = await getLeaders();
        const employeesData = employeesResponse.data;
        const leadersData = leadersResponse.data;

        const empObj = {};

        employeesData.forEach((employee) => {
          empObj[employee.id] = [employee.name, employee.email];
        });

        leadersData.forEach((leader) => {
          empObj[leader.id] = [leader.name, leader.email];
        });

        setEmployeeMap(empObj);
        setEmployees([...employeesData, ...leadersData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const searchSalary = async () => {
    try {
      const obj = {};

      if (selectedEmployee) {
        obj["employeeID"] = selectedEmployee;
      }

      const res = await viewAllSalaries(obj);
      const { data } = res;
      setSalaries(data);
    } catch (error) {
      console.error("Error searching salary:", error);
    }
  };

  return (
    <>
      {salaries ? (
        <div className="main-content">
          <section className="section">
            <HeaderSection title="Salary" />
            <div className="d-flex justify-content-center align-items-center w-100">
              <div className="form-group col-md-6">
                <br />
                <select
                  className="form-control select2"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={searchSalary}
                className="btn btn-lg btn-primary col"
              >
                Search
              </button>
            </div>
          </section>
          <div className="table-responsive">
            <table className="table table-striped table-md center-text">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Bonus</th>
                </tr>
              </thead>
              <tbody className="sidebar-wrapper">
                {salaries.map((salary, idx) => (
                  <tr
                    key={salary._id}
                    className="hover-effect"
                    onClick={() => history.push(`salary/${salary._id}`)}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      {employeeMap[salary.employeeID] &&
                        employeeMap[salary.employeeID][0]}
                    </td>
                    <td>
                      {employeeMap[salary.employeeID] &&
                        employeeMap[salary.employeeID][1]}
                    </td>
                    <td>{salary.salary}</td>
                    <td>{salary.bonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Salaries;
