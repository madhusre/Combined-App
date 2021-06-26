import React from 'react';
//import {useParams} from 'react-router-dom';
import axios from 'axios'
import {useEffect,useState} from 'react'

function AddCart(){
    let [product,setProduct]=useState('')
    useEffect(()=>{
        axios.get('/user/getproduct')
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
                      <div>
                          <table>
                              <thead>
                                  <th>Name</th>
                                  <th>product</th>
                                  <th>profileImage</th>
                              </thead>
                              <tbody>
                          <tr>
                              <td>{object.name}</td>
                              <td>{object.products}</td>
                              
                            </tr>
                              </tbody>
                              </table>
                        
</div>
    
                  )
             })
         }
        </div>
    )
}
export default AddCart;