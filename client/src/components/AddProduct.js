import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

export default function AddProduct() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [brands, setBrands] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    var apiPathForBrand = process.env.REACT_APP_NODEAPI + "brand";
    var apiPathForCategory = process.env.REACT_APP_NODEAPI + "Category";

    const fetchCategoriesAndBrand = async () => {
      try {
        var categoryResponse = await fetch(apiPathForCategory);
        var categoryData = await categoryResponse.json();
        console.log(categoryData);
        setCategories(categoryData.data);

        var brandResponse = await fetch(apiPathForBrand);
        var brandData = await brandResponse.json();
        console.log(brandData);
        setBrands(brandData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesAndBrand();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("brand", data.brand);
      formData.append("category", data.category);
      formData.append("productName", data.productName);
      formData.append("productPrice", data.productPrice);
      formData.append("productDesc", data.productDesc);
      formData.append("productImg", data.productImg[0]); 

      const apiPathForProduct = process.env.REACT_APP_NODEAPI + "product";

      const response = await fetch(apiPathForProduct, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      toast.success("Product Added Successfully")
      console.log("Product Added Successfully:", result);

      // Reset form after successful submission
      // reset();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };
  return (
    <>
    <AdminMenu/>
      <Container>
        <h1>ADD PRODUCT</h1>
        <div className="form-div">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* BRAND */}
            <label className="form-label">BRAND</label>
            <select
              className="form-select"
              {...register("brand", { required: true })}
            >
              {brands &&
                brands.length > 0 &&
                brands.map(({ brandName, _id }) => (
                  <option key={_id} value={_id}>
                    {brandName}
                  </option>
                ))}
            </select>
            {errors.brand?.type === "required" && (
              <p role="alert">Brand is required</p>
            )}
            <br />

            {/* CATEGORY */}
            <label className="form-label">CATEGORY</label>
            <select
              className="form-select"
              {...register("category", { required: true })}
            >
              {categories &&
                categories.length > 0 &&
                categories.map(({ categoryName, _id }) => (
                  <option key={_id} value={_id}>
                    {categoryName}
                  </option>
                ))}
            </select>
            {errors.category?.type === "required" && (
              <p role="alert">Category is required</p>
            )}
            <br />

            {/* PRODUCT NAME */}
            <label className="form-label">PRODUCT NAME</label>
            <input
              className="form-control"
              {...register("productName", { required: true })}
            />
            {errors.productName?.type === "required" && (
              <p role="alert">Product Name is required</p>
            )}
           
            <br />

            {/* PRODUCT PRICE */}
            <label className="form-label">PRODUCT PRICE</label>
            <input
              className="form-control"
              type="number"
              {...register("productPrice", { required: true })}
            />
            {errors.productPrice?.type === "required" && (
              <p role="alert">Product Price is required</p>
            )}
            <br />

            {/* PRODUCT DESCRIPTION */}
            <label className="form-label">PRODUCT DESCRIPTION</label>
            <input
              className="form-control"
              {...register("productDesc", { required: true})}
            />
            {errors.productDesc?.type === "required" && (
              <p role="alert">Product Description is required</p>
            )}
           
            <br />

            {/* PRODUCT IMAGE */}
            <label className="form-label">PRODUCT IMAGE</label>
            <input
              className="form-control"
              type="file"
              {...register("productImg", { required: true })}
            />
            {errors.productImg?.type === "required" && (
              <p role="alert">Product Image is required</p>
            )}
            <br />

            {/* SUBMIT BUTTON */}
            <button type="submit" className="button">
              ADD PRODUCT
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
