import './App.css'
import {useFormik} from 'formik';
import {AuthContext} from './context/Authcontext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
function Login() {

 
    const {auth, SetAuth, logout} = useContext(AuthContext);
   const toast = useToast();
   const navigate = useNavigate();
   
   const loginpage = async(values) => {
    console.log(values)
   
   
    try{
    
       
            const result = await axios.post("http://localhost:4250/user/login", values);
       return result.data
           
       

    }catch(error){
        console.log("login post error==>",error);
    }
   }
  const formik = useFormik({
    initialValues:{
        email:"",
        password:""
    },
    onSubmit: async(values) => {
        try{
            const result = await loginpage(values)
            console.log("Login Result:", values);
            if(result&&result.jwtToken){
                const token = result.jwtToken;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
               
               
               
                    SetAuth(true);
                   
               
              
                toast({
                    title:'successful',
                    status:'success',
                    duration:1000,
                    isClosable:true
                });
               
                    navigate("/main")
              
            }else{
                toast({
                    title:result.message,
                    status:'error',
                    duration:1000,
                    isClosable:true
                })
            }
        }catch(error){
            console.log(error)
        }
    }
  })    



    return(
        <>
        <div id="lg">
            <div id='lghead'>
            <h1>Sign in to your account</h1>
            </div><form onSubmit={formik.handleSubmit} id="lgform">
  
  <div>
    <label>Email</label><br />
    <input
      name="email"
      value={formik.values.email}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
    />
  </div>
  <div>
    <label>Password</label><br />
    <input
      name="password"
      value={formik.values.password}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
    />
  </div>
  <div>
    <button type="submit" className='reg'>Submit</button>
  </div>
</form>

        </div>
        </>
    )
}
export default Login