import React from 'react'
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';


export default function AddCategory() {

  const { register, formState: { errors } ,handleSubmit } = useForm();

  var navigate = useNavigate();

  function onSubmit(data){
    console.log(data)

    var category = data.categoryName
    console.log(category)

    var apiPath = process.env.REACT_APP_NODEAPI + 'category'

    fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify({
        categoryName : category
      }),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(res=> res.json())
    .then(value=>{
      console.log(value)
      toast.success('Category Added Successfully')
      navigate('/addProduct')
    })
  }


  return (
    <>
    <AdminMenu/>
      <Container>
        <h1>ADD CATEGORY</h1>
        <div className='form-div'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='form-control'>CATEGORY NAME</label><br/>
            <input className='form-control' {...register("categoryName", { required: true, maxLength: 10 })} /><br/>
            {errors.categoryName?.type === 'required' && <p role="alert">CategoryName is Required</p>}
            {errors.categoryName?.type === 'maxLength' && <p role="alert">MaxLength :10</p>}
            <button type='submit' className='button'>ADD CATEGORY</button>
          </form>
        </div>
      </Container>
    </>
  )
}
