import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

export default function UserDashboard() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [checkedUsers, setCheckedUsers] = useState([]);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
    // Get the checked user IDs from localStorage if any
    const savedCheckedUsers =
      JSON.parse(localStorage.getItem("checkedUsers")) || [];
    setCheckedUsers(savedCheckedUsers);
  }, []);

  const fetchUserData = () => {
    const apiPathForUsers = `${process.env.REACT_APP_NODEAPI}user`;

    fetch(apiPathForUsers)
      .then((res) => res.json())
      .then((userValue) => {
        setUserData(userValue.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        toast.error("Failed to fetch user data");
      });
  };

  // Handle sign out
  function signout() {
    toast.success("SIGN OUT SUCCESSFULLY");
    navigate("/");
  }

  // Handle user deletion
  function deleteData(ev, userid) {
    ev.preventDefault();

    const apiPath = `${process.env.REACT_APP_NODEAPI}user/${userid}`;
    console.log(apiPath)
    fetch(apiPath, { method: "DELETE" })
      .then((res) => res.json())
      .then((value) => {
        if (value.status) {
          setUserData((prev) => prev.filter((user) => user._id !== userid));
          toast.success("USER DELETED SUCCESSFULLY");
        } else {
          toast.error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Error occurred while deleting user");
      });
  }

  const handleCheckboxChange = (userId, isChecked) => {
    let updatedCheckedUsers;

    if (isChecked) {
        updatedCheckedUsers = [...checkedUsers, userId];
        var apiPathUserstatus = process.env.REACT_APP_NODEAPI + `user/updateStatus/${userId}`;

        fetch(apiPathUserstatus, {
            method: "PUT",
            body: JSON.stringify({ userstatus: 0 }), // Set status to 0
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((value) => {
                console.log(value);
                toast.success("User assigned as Admin successfully");
            })
            .catch((err) => {
                console.error("Error updating status:", err);
                toast.error("Failed to assign Admin");
            });
    } else {
        updatedCheckedUsers = checkedUsers.filter((id) => id !== userId);
        var apiPathUserstatus = process.env.REACT_APP_NODEAPI + `user/updateStatus/${userId}`;

        fetch(apiPathUserstatus, {
            method: "PUT",
            body: JSON.stringify({ userstatus: 1 }), // Set status to 1
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((value) => {
                console.log(value);
                toast.success("Admin status removed successfully");
            })
            .catch((err) => {
                console.error("Error updating status:", err);
                toast.error("Failed to remove Admin status");
            });
    }

    // Update state
    setCheckedUsers(updatedCheckedUsers);

    // Save to localStorage to persist the state
    localStorage.setItem("checkedUsers", JSON.stringify(updatedCheckedUsers));
};

  
  return (
    <>
      <AdminMenu />
      <div className="userData-container">
        <div className="userData-header">
          <div className="userData-title">ALL USERS:</div>
          <div className="home-buttons">
            <button className="button">
              <Link to="/register">
                <FaPlus /> SIGN UP
              </Link>
            </button>
          </div>
          <div className="signout-button">
            <button className="button" onClick={signout}>
              SIGN OUT
            </button>
          </div>
        </div>
        <hr />
        <div className="userData-Table">
          <Table className="custom-table">
            <thead>
              <tr>
                <th>✔️</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.length > 0 &&
                userData.map(({ name, email, mobile, _id, userstatus }) => (
                  <tr key={email}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedUsers.includes(_id)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            _id,
                            e.target.checked,
                            userstatus
                          )
                        }
                      />
                    </td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{mobile}</td>
                    <td>
                      <button className="update-button">
                        <Link to={`/update/${_id}`}>
                          <FaEdit />
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={(ev) => {
                          deleteData(ev, _id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
