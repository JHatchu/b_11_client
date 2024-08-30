import {useState, createContext, useEffect} from 'react'
import jwtDecode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import {useToast} from '@chakra-ui/react'

 export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, Setuser] = useState({userId:'0', userName:""})
   
 
    const [auth, SetAuth] = useState([])

    
     const Toast = useToast()
     const Navigate = useNavigate()


     const CheckTokenExpired = async () => {
        const token = localStorage.getItem("token")
      
        if(token){
            let decode = await jwtDecode(token)
            let currentDate = new Date();
            if(decode.exp * 1000 < currentDate.getTime()){
                localStorage.removeItem("token")
                console.log("token expired")
                SetAuth(false)
              
                Navigate("/")
            }
        
     }
     }
     const IsLogged = async () => {
        const token = localStorage.getItem('token')
      
         try{
            if(token){
               
                 const decode = await jwtDecode(token)
                 console.log(decode,"decode")
                 if(decode.user){
                  SetAuth(true)
                  
                console.log("A>>",auth);
                  Setuser({userId:decode.user.id, userName:decode.user.userName})
                 }
               
               
                
            }
          
            else{
                localStorage.removeItem('token')
                SetAuth(false)
             
                Setuser({userId:0, userName:""})
            }
         }catch(error){
            console.log(error)
            localStorage.removeItem("token")
            SetAuth(false)
          
            Setuser({userId:0, userName:""})
         }


     }
     const logout = () =>{
        localStorage.removeItem("token")
        SetAuth(false)
       
        Setuser({ userId: '0', userName: '' });
        Navigate("/")
     }
    useEffect(()=>{
    IsLogged();
    CheckTokenExpired()
     },[auth])

const values = {
    SetAuth,
    auth,
    logout,
    user
    
    
}

return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>



}
