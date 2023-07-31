import axios from "axios";
import React, { useContext, useRef } from "react";
import { Context } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify";

const baseUrl=require('../../Utils/config/default');

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();

    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(`${baseUrl}/auth/superadmin/login`, {
                email: userRef.current.value,
                password: passwordRef.current.value
            })

            try {
                if (res.data.token) {
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                    window.location.replace("/")
                }

            } catch (err) {
                dispatch({ type: "LOGIN_FAILURE" });
                toast.error(err.response.data)

            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            toast.error(err.response.data)
        }

    }


    return (
        <>
            <ToastContainer />

            {/* <div className="section-padding form_bg">
                <div className="container" id="loginContainer">
                    <div className="row">
                        <div className="col-md-6 offset-md-3" id="loginrow">
                            <form className="form_horizontal p-5" onSubmit={handleSubmit}>
                                <div className="title" id="loginId">
                                    <h3>login form</h3>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fas fa-user"></i></span>
                                        <input className="form-control" type="email" name="" id="loginUsername" placeholder="Username" ref={userRef} />
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fas fa-lock"></i></span>
                                        <input className="form-control" type="password" name="" id="loginPassword" placeholder="Password" ref={passwordRef} />
                                    </div>
                                    <button className="btnn signin" type="submit">login</button>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div> */}


            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a className="logo d-flex align-items-center w-auto">
                                            <span className="d-none d-lg-block">SuperAdmin Login</span>
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
                                                <p className="small mb-0">having trouble logging in? <a href="">Please contact system administrator.</a></p>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                                {/* <div className="credits">
          Designed by <a href="https://">l</a>
        </div> */}

                            </div>
                        </div>
                    </div>

                </section>

            </div>

        </>
    )
}

export default Login;