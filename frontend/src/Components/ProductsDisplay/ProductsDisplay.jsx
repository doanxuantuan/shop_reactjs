import React, { useContext } from 'react'
import './ProductsDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
const ProductsDisplay = (props) => {
  const {product}=props;
  const {addToCart}=useContext(ShopContext);
  return (
    <div className='ProductsDisplay'>
        <div className="products-display-left"> 
            <div className="products-display-left-image-list">
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
              <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-image">
              <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="products-display-right">
            <h1>{product.name}</h1> 
            <div className="productdisplay-right-star">
                  <img src={star_icon} alt="" />  
                  <img src={star_icon} alt="" />  
                  <img src={star_icon} alt="" />  
                  <img src={star_icon} alt="" />  
                  <img src={star_dull_icon} alt="" />  
                  <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">
                ${product.old_price}
              </div>
              <div className="productdisplay-right-price-new">
                ${product.new_price}
              </div>
            </div>
            <div className="productdisplay-right-description">
              Vietnam’s national dress, the áo dài is one of the country’s most striking symbols of beauty. 
              Over hundreds of years, the áo dài has evolved alongside Vietnam, going from regal to practical, humble to high fashion, and back again. 
              The Vietnamese áo dài is appreciated by the young and old alike, and its elegant lines flatter both men and women
            </div>
            <div className="productdisplay-right-size">
                  <h1>Select Size</h1>
                  <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>M</div>
                    <div>XL</div>
                    <div>XXL</div>
                  </div>               
            </div>  
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>Women, T-Short, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>        
        </div>
    </div>
  )
}

export default ProductsDisplay