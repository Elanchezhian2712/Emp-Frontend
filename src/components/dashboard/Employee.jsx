import React from "react";
import { useSelector } from "react-redux";
import HeaderSection from "../../components/HeaderSection";

const Employee = () => {
  const { user } = useSelector((state) => state.authSlice);

  return (
    <div className="">
      <section className="section">
        <HeaderSection title={`Welcome ${user?.name}`} />
        {/* <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>Welcome {user?.name}</h4>
              </div>
            </div> */}

        <div className="card">
          <div className="card-body row">
            {/* <div className="col-md-10 ">
              <img
                className="img-fluid img-thumbnail"
                src={user.image}
                alt=""
              />
            </div> */}
            <div className="col-md-11">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name :</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Username :</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Email :</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Usertype :</th>
                    <td>{user.type}</td>
                  </tr>
                  <tr>
                    <th>Status :</th>
                    <td>{user.status}</td>
                  </tr>
                  <tr>
                    <th>Mobile :</th>
                    <td>{user.mobile}</td>
                  </tr>
                  <tr>
                    <th>Address :</th>
                    <td>{user.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employee;
