import axios from "axios"

export default function Test()
{ 
    let token=localStorage.getItem("token")
  // create new axion to req obj
  let apiURL="http://localhost:9000"
  const axiosReq=axios.create({
      baseURL:apiURL,
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  const makeProtect=()=>{
      axiosReq.get("user/testing")
      .then(res=>{
          alert(res.data.message)
      })
  }


return(
        <div>
            <h1>test</h1>
            <button onClick={()=>makeProtect()}>make req</button>
        </div>
    )
}