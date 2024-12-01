import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { PiSignInLight } from "react-icons/pi";
import HomeMenu from "./HomeMenu";
import Table from "react-bootstrap/Table";

export default function HomePage() {

  const [userData, setUserData] = useState([]);
  // var navigate = useNavigate()

  useEffect(() => {
    const apiPathForUsers = process.env.REACT_APP_NODEAPI + "user";

    fetch(apiPathForUsers)
      .then((res) => res.json())
      .then((userValue) => {
        console.log(userValue);
        setUserData(userValue.data);
      });
  }, []);
  return (
    <>
      <HomeMenu />
      <Container className="homepage-container">
        <div className="home-buttons">
          <button className="button">
            <Link to="/register">
              <FaPlus /> SIGN UP
            </Link>
          </button>
          <button className="button">
            <Link to="/login">
              <PiSignInLight /> SIGN IN
            </Link>
          </button>
        </div>
        <div className="alluser">
          <h3>
            ALL USERS: 
          </h3>
        </div>
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
      
      </Container>
      
    </>
  );
}
