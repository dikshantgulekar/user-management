import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import AdminMenu from './AdminMenu';
import { toast } from 'react-toastify';

export default function EditUser() {

    var navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [userData , setUserData] = useState([]);

    var {userid} = useParams();

    useEffect(()=>{

        var apiPath = process.env.REACT_APP_NODEAPI + `user/${userid}`

        fetch(apiPath)
        .then(res=> res.json())
        .then(value => {
            console.log(value.data)
            setUserData(value.data)
        })
    },[userid])


    async function onSubmit(data){
        console.log(data);
        
        var name = data.userName
        var email = data.userEmail
        var mobile = data.userMobile

        console.log(name)
        console.log(email)
        console.log(mobile)

        var apiPath = process.env.REACT_APP_NODEAPI + `user/${userid}`
        console.log(apiPath)
        fetch(apiPath,{
            method : "PUT",
            body : JSON.stringify({
                name : name,
                email : email,
                mobile : mobile
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=> res.json())
        .then(value => {
            console.log(value)
            toast.success('USER UPDATED SUCCESSFULLY')
            navigate('/admin')
        })

    }

  return (
    <>
    <AdminMenu/>
        <Container>
            <h1>EDIT FORM</h1>
            <div className="form-div">
            {userData && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <label>NAME</label>
                    <input
                    defaultValue={userData.name}
                        className="form-control"
                        {...register("userName", { required: "User Name is required" })}
                    />
                    {errors.userName && <p role="alert">{errors.userName.message}</p>}

                    <label>EMAIL</label>
                    <input
                    defaultValue={userData.email}
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
                    defaultValue={userData.mobile}
                        className="form-control"
                        {...register("userMobile", {
                            required: "Mobile number is required",
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" },
                        })}
                    />
                    {errors.userMobile && <p role="alert">{errors.userMobile.message}</p>}

        
                    <button type="submit" className="button">
                        UPDATE 
                    </button>
                  
                </form>
                  )}
            </div>
        </Container>
    </>
  )
}
