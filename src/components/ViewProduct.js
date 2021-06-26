import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios'
import {useEffect,useState} from 'react'

function ViewProduct(props){
    let [product,setProduct]=useState()
    useEffect(()=>{
        axios.get('/product/getproduct')
        .then(res=>{
            let productobj=res.data.message
            console.log(productobj)
            setProduct([...productobj])
        })
    },[])
    return(
        <div className="row row-col-sm-3 bg-primary">
         {
             product && product.map((object)=>{
                  return(
                      <div className="col-sm-4 m-1">
                          <div className="card border border-dark shadow">
                              <img weight="200px" height="200px" alt="" src={object.profileImage}></img>
                              <hr className="border border-dark"></hr>
                              <h6>productname:{object.name}</h6>
                              <h6>model:{object.model}</h6>
                              <h6>price:{object.price}</h6>
                              <div className="ms-5 m-1">
                                  <button className="btn btn-primary" onClick={()=>props.userCartButton( product)}>Addcart</button>
                                 
                              </div>
                          </div>

                      </div>
                  )
             })
         }
        </div>
    )
}
export default ViewProduct;