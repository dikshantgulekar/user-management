import React from "react";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function AddCategory() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = watch("userPassword");

    const onSubmit = async (data) => {
        try {
            const response = await fetch(process.env.REACT_APP_NODEAPI + "user", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();
            if (!result.status) {
                toast.error(result.msg || "User Already Exists");
            } else {
                toast.success("User Added Successfully");
                navigate("/login");
            }
        } catch (err) {
            console.error("Error during user submission:", err);
            toast.error("Failed to add user");
        }
    };

    return (
        <Container>
            <h1>SIGN UP FORM</h1>
            <div className="form-div">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>NAME</label>
                    <input
                        className="form-control"
                        {...register("userName", { required: "User Name is required" })}
                    />
                    {errors.userName && <p role="alert">{errors.userName.message}</p>}

                    <label>EMAIL</label>
                    <input
                        className="form-control"
                        type="email"
                        {...register("userEmail", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.userEmail && <p role="alert">{errors.userEmail.message}</p>}

                    <label>MOBILE</label>
                    <input
                        className="form-control"
                        {...register("userMobile", {
                            required: "Mobile number is required",
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" },
                        })}
                    />
                    {errors.userMobile && <p role="alert">{errors.userMobile.message}</p>}

                    <label>PASSWORD</label>
                    <input
                        className="form-control"
                        type="password"
                        {...register("userPassword", {
                            required: "Password is required",
                            minLength: { value: 4, message: "Minimum length is 4" },
                            maxLength: { value: 8, message: "Maximum length is 8" },
                        })}
                    />
                    {errors.userPassword && <p role="alert">{errors.userPassword.message}</p>}

                    <label>CONFIRM PASSWORD</label>
                    <input
                        className="form-control"
                        type="password"
                        {...register("userCpassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                    />
                    {errors.userCpassword && <p role="alert">{errors.userCpassword.message}</p>}

                    <button type="submit" className="button">
                        SIGN UP
                    </button>
                </form>
            </div>
        </Container>
    );
}
