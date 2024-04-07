import { NavLink } from "react-router-dom";
import swal from "sweetalert";

const RowAdmin = ({ index, data }) => {
  const remove = async () => {
    // const res = await removeMember({userId:data.id});
    // if(res.success)
    // {
    //     toast.success(res.message);
    //     dispatch(updateEmployeeCount('DECREMENT'));
    //     dispatch(setTeamMembers(teamMembers.filter(member => member.id!==data.id )));
    //     if(freeEmployees)
    //             dispatch(setFreeEmployees([...freeEmployees,data]));
    //         else
    //             dispatch(setFreeEmployees([data]));
    // }
  };
  const showDialog = () => {
    swal({
      title: "Are you sure?",
      text: `You want to remove!\n${data.name} \nfrom this Leaders`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((yes) => {
      if (yes) remove();
    });
  };
  return (
    <tr>
      <td>{index}</td>
      {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.mobile}</td>
      <td>
        <div
          className={`badge ${
            data.status === "Active" ? "badge-primary" : "badge-danger"
          }`}
        >
          {data.status}
        </div>
      </td>
      <td>
        <NavLink to={`/admin/${data.id}`} className="btn btn-secondary">
          Detail
        </NavLink>
      </td>
      <td>
        <button className="btn btn-danger" onClick={showDialog}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default RowAdmin;
