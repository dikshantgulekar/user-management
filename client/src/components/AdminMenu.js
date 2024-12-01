import React from "react";
import Container from "react-bootstrap/Container";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
export default function AdminMenu() {
  return (
    <>
      <Container className="header" fluid>
        <div className="project-name">USER MANAGEMENT</div>

        <div className="menu">
          <div className="menu-buttons">
            <button>
              <Link to="/admin" className="Linkcss">
                HOME
              </Link>
            </button>
            <button>
              <Link to="/showProduct" className="Linkcss">
                PRODUCTS
              </Link>
            </button>
            <button>
              <Link to="/addBrand" className="Linkcss">
                ADD BRAND
              </Link>
            </button>
            <button>
              <Link to="/addCategory" className="Linkcss">
                ADD CATEGORY
              </Link>
            </button>
            <button>
              <Link to="/addProduct" className="Linkcss">
                ADD PRODUCT
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
