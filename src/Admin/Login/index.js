import axios from "axios";
import { useNavigate} from 'react-router-dom';
import React, { useContext, useRef, useState } from "react";
import { Context } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Common/Loader/index";

const baseUrl=require('../../Utils/config/default')


const Login = () => {

    const navigate = useNavigate();
    const [propType,setPropType]=useState("");
    const [loginfailure,setLoginFailure]=useState("");
    const [loading, setLoading] = useState(false);

    const userRef=useRef();
    const passwordRef=useRef();

    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/dashboard');
        //history.push("/dashboard");
      };
    

    const {dispatch,isFetching}=useContext(Context)
   
    const handleSubmit= async (e)=>{
        setLoading(true);
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try{

            // console.log(passwordRef.current.value)

            const res=await axios.post(`${baseUrl}/auth/hoteladmin/login`,{
                email:userRef.current.value,
                password:passwordRef.current.value
            })

            if(propType==="Mandarmani"){
                res.data.hotelId="hotelMandarmani_12"
            }
            console.log(res)

            try{
                if(res.data.token){
                dispatch({type:"LOGIN_SUCCESS",payload:res.data});
             
                setLoginFailure(false); 
                setLoading(false);
                navigateHome();
                //window.location.replace("/dashboard")

            }

            }catch(err){
               // toast.error(err.response.data) 
               setLoginFailure(true); 
                dispatch({type:"LOGIN_FAILURE"});
               setLoading(false);
            }

            
        }catch(err){
            setLoginFailure(true);
            dispatch({type:"LOGIN_FAILURE"});
           setLoading(false);
        }

    }

    return (
        <>
         <ToastContainer />
        {loading ? (
        <Loader/>
      ) :(
           
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                               
                                    <div className="d-flex justify-content-center py-4">
                                        <a className="logo d-flex align-items-center w-auto">
                                            <span className="d-none d-lg-block">Admin Login</span>
                                        </a>
                                    </div>

                               

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your username & password to login</p>
                                        </div>

                                        <form className="row g-3 needs-validation" novalidate>
                                        <div className="col-12">
                                                <label for="yourUsername" className="form-label">Property</label>
                                                <div className="input-group has-validation">
                                                    <select
                                                        onChange={e => setPropType(e.target.value)}
                                                        className="form-control"
                                                        name="propType" >
                                                        <option>Select Property Type</option>
                                                        <option val="hotelMandarmani_12">Mandarmani</option>
                                                        <option val="Digha">Digha</option>
                                                        <option val="Bakkhali_1">Bakkhali Sea View</option>
                                                        <option val="Bakkhali_2">Bakkhali Grand View</option>
                                                       
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourUsername" className="form-label">Username</label>
                                                <div className="input-group has-validation">
                                                    {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                                                    <input type="text" name="username" className="form-control" id="loginUsername" ref={userRef} required />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourPassword" className="form-label">Password</label>
                                                <input type="password" name="password" className="form-control" id="loginPassword" ref={passwordRef} required />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            {/* <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                    <label className="form-check-label" for="rememberMe">Remember me</label>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" onClick={handleSubmit}>Login</button>
                                            </div>

                                            <div className="col-12">
                                                <p className="small mb-0">Don't have account? <a href="">Please contact system administrator.</a></p>
                                            </div>
                                        </form>

 
                                    </div>
                                </div>
                                {loginfailure?<label for="yourPassword" className="form-label color-red ">Invalid credentials. Please use proper credentials.</label>:null}
                                

                                {/* <div className="credits">
          Designed by <a href="https://">l</a>
        </div> */}

                            </div>
                        </div>
                    </div>

                </section>

            </div>
     )} 
        </>
    )
}

export default Login;