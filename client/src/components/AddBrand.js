import React  from 'react'
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
// import { CgToday } from 'react-icons/cg';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';


export default function AddBrand() {

  const { register, formState: { errors } ,handleSubmit } = useForm();

  var navigate = useNavigate();

  function onSubmit(data){
    console.log(data)

    var brand = data.brandName
    console.log(brand)

    var apiPath = process.env.REACT_APP_NODEAPI + 'brand'

    fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify({
        brandName : brand
      }),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(res=> res.json())
    .then(value=>{
      console.log(value)
      toast.success('Brand Added Successfully')
      navigate('/addCategory')
    })
  }

  return (
    <>
    <AdminMenu/>
      <Container>
        <h1>ADD BRAND</h1>
        <div className='form-div'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-control'>BRAND NAME</label><br/>
            <input className='form-control' {...register("brandName", { required: true, maxLength: 10 })} /><br/>
            {errors.brandName?.type === 'required' && <p role="alert">Brand Name is Required</p>}
            {errors.brandName?.type === 'maxLength' && <p role="alert">MaxLength :10</p>}
            <button type='submit' className='button'>ADD BRAND</button>
          </form>
        </div>
      </Container>
    </>
  )
}
