import React from "react";
import Container from "react-bootstrap/Container";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";

export default function HomeMenu() {
  return (
    <>
      <Container className="header" fluid>
        <div className="project-name">USER MANAGEMENT</div>

        <div className="menu">
          <div className="menu-buttons">
            <button>
              <Link to="/" className="Linkcss">
                HOME
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
