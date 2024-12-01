import React from 'react'
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import HomeMenu from './HomeMenu';


export default function Login() {

  const { register, formState: { errors } ,handleSubmit } = useForm();

  var navigate = useNavigate();


  function onSubmit(data) {
    // console.log(data)
    const { userEmail, userPassword } = data;

    const apiPathForLogin = process.env.REACT_APP_NODEAPI + 'login';

    fetch(apiPathForLogin, {
        method: 'POST',
        body: JSON.stringify({
            email: userEmail, // Matches backend
            password: userPassword, // Matches backend
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((value) => {
            console.log(value);
            console.log(value.userstatus)
            if (value.status) {
                localStorage.setItem('userstatus', value.userstatus)
                toast.success('LOGIN SUCCESSFUL');
                if(value.userstatus == 0){
                  navigate('/admin')
                }
                if(value.userstatus == 1){
                  navigate('/user')
                }
                
            } else {
                toast.error('INVALID MAIL PASSWORD'); // Show error messages from backend
            }
        })
        .catch((err) => {
            console.error('Error during login:', err);
            toast.error('Something Went Wrong');
        });
}




  return (
    <>
    <HomeMenu/>
      <Container>

        <h1>LOGIN PAGE</h1>
        <div className='form-div'>
          <form onSubmit={handleSubmit(onSubmit)}>
          <label className='form-control'> EMAIL ADDRESS</label><br/>
            <input type='email' className='form-control' {...register("userEmail", { required: true , pattern:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/})} />
            {errors.userEmail?.type === 'required' && <p role="alert">User Email is Required</p>}
            {errors.userEmail?.type === 'pattern' && <p role="alert">Invalid email address</p>}
            <br/>

            <label className='form-control'>PASSWORD</label><br/>
            <input type='password' className='form-control' {...register("userPassword", { required: true ,minLength:4, maxLength: 8})} />
            {errors.userPassword?.type === 'required' && <p role="alert">PASSWORD is Required</p>}
            {errors.userPassword?.type === 'required' && <p role="alert">MinLength : 4</p>}
            {errors.userPassword?.type === 'required' && <p role="alert">MaxLength : 8</p>}
            <br/>
            <button type='submit' className='button'>LOGIN</button>
          </form>
        </div>
      </Container>
    </>
  )
}
