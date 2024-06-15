import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage]=useState(false);
    const [productDetails,setproductDetails]=useState({
        name:"",
        image:"",
        category:"men",
        new_prices:"",
        old_prices:""
    })
    const imageHandle=(e)=>{
        setImage(e.target.files[0]);
      }
    const changeHandle=(e)=>{
        setproductDetails({...productDetails,[e.target.name]:e.target.value})
      }
    const add_Product= async ()=>{
        console.log(productDetails);
        let responeData;
        let product=productDetails;
        
        let formData=new FormData();
        formData.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responeData=data})
        if(responeData.success)
            {
                product.image=responeData.image_url;
                console.log(product);
                await fetch('http://localhost:4000/addproduct',{
                  method:'POST',
                  headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                  },
                  body:JSON.stringify(product),
                }).then((resp)=>resp.json()).then((data)=>{
                  data.success?alert("Add Success"):alert("Failed")
                })
            }
      }

    return (
        <div className='add-product'>
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandle} type="text"name='name' placeholder='Typehere'/>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_prices} onChange={changeHandle} type="text" name='old_prices'placeholder='Type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_prices} onChange={changeHandle} type="text" name='new_prices'placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandle} name="category" className='add-product-selector'>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandle}  type="file" name='image' id='file-input' hidden />
          </div>
          <button onClick={()=>{add_Product()}} className='addproduct-btn'>Add</button>
      </div>

    )
}
export default AddProduct