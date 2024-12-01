import React from "react";
import Container from "react-bootstrap/Container";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";

export default function UserMenu() {
  return (
    <>
      <Container className="header" fluid>
        <div className="project-name">USER MANAGEMENT</div>

        <div className="menu">
          <div className="menu-buttons">
            <button>
              <Link to="/user" className="Linkcss">
                HOME
              </Link>
            </button>
            <button>
              <Link to="/showuserproduct" className="Linkcss">
                PRODUCTS
              </Link>
            </button>
          </div>
        </div>

        <div className="profile">
          <CgProfile />
        </div>
      </Container>

 
    </>
  );
}
