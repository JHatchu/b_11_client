import { useState, useContext } from 'react';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

import { AuthContext } from './context/Authcontext';
import { useNavigate } from 'react-router-dom'; 
import { useToast } from '@chakra-ui/react';
import Login from './login';
function Register() {
   const [Register,SetRegister] = useState([])
   const authcontext = useContext(AuthContext);
   const{auth, SetAuth} = authcontext;
   const Navigate = useNavigate()
       const Toast = useToast()


 
const register =  async (values) => {
    console.log("r1 values===>",values)
    try{
     const result =  await axios.post("http://localhost:4250/user/register",values)
       console.log("r3 result===>",result)
       return result.data
    }catch(error){
        console.log(error)
    }

}


const formik = useFormik({
    initialValues:{
     fname:"",
     lname:"",
     email:"",
     password:"",
     confirmpassword:""

    },
  
    
    onSubmit :async(values) => {

        console.log("r2===>",values)
        try{
            const result =  await register(values)
            if(result.jwtToken){
                localStorage.setItem('token',result.jwtToken)
                SetAuth(true)
                Toast({
                    title:'successful',
                    status:'success',
                    duration: 1000,
                    isClosable:'true'

                })
                Navigate("/")
            }
            else{
                Toast({
                    title:result.error,
                    status:'error',
                    duration: 1000,
                    isClosable:'true'

                })
                
            }
                    console.log("r1===>",values)
        }catch(error){
            console.log(error)
        }
    }
})



    return(
        <>
        <div id="rg">
            <div id='rghead'>
            <h1>Register</h1>
            </div>
            <form onSubmit={formik.handleSubmit} id="rgform">
                <div>
                <label>FirstName</label><br></br>
                <input value={formik.values.fname} name="fname"
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                />
                {formik.touched.fname && formik.errors.fname? (
                    <div>{formik.errors.fname}</div>
                ):null}
                </div>
                <div>
                <label>LastName</label><br></br>
                <input value={formik.values.lname} name="lname"
                onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                {formik.touched.lname && formik.errors.lname? (
                    <div>{formik.errors.lname}</div>
                ):null}
                </div>
                <div>
                <label>Email-Id</label><br></br>
                <input type='email' value={formik.values.email} name="email"
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email? (
                    <div>{formik.errors.email}</div>
                ):null}
                </div>  
                <div>
                <label>Password</label><br></br>
                <input type='password'  name="password"
                value={formik.values.password} onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.password && formik.errors.password? (
                    <div>{formik.errors.password}</div>
                ):null}
                </div>  
                <div>
                <label>Confirm Password</label><br></br>
                <input type='password' name="confirmpassword"
                value={formik.values.confirmpassword} onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.confirmpassword && formik.errors.confirmpassword? (
                    <div>{formik.errors.confirmpassword}</div>
                ):null}
                </div>  
                <div>
                    <button className='reg' type='submit'>Submit</button>
                    </div>
                    <div id='rglink'>
                        <span>Already a user? <Link to={'/'}>Login</Link></span>
                    </div>
            </form>
        </div>
        </>
    )
}
export default Register