import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [userData, setUserData] = useState([]);
  var navigate = useNavigate()

  useEffect(() => {
    const apiPathForUsers = process.env.REACT_APP_NODEAPI + "user";

    fetch(apiPathForUsers)
      .then((res) => res.json())
      .then((userValue) => {
        console.log(userValue);
        setUserData(userValue.data);
      });
  }, []);

  function signout(){
    console.log("signout")
    toast.success('SIGN OUT SUCCESSFULLY')
    navigate('/')
  }

  return (
    <>
      <UserMenu />
      <div className="userData-container">
        <div className="userData-header">
          <div className="userData-title">ALL USERS:</div>
          <div className="signout-button">
            <button className="button" onClick={signout}>SIGN OUT</button>
          </div>
        </div>
        <hr />
        <div className="userData-Table">
          <Table className="custom-table">
            <thead>
              <tr>
                {/* <th>✔️</th> */}
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.length > 0 &&
                userData.map(({ name, email, mobile }) => (
                  <tr key={email}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{mobile}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
