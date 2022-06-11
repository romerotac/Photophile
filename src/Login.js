import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
//import fontawesome from '@fortawesome/fontawesome-common-types'
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';
//import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

//fontawesome.library.add(faCheckSquare, faCoffee);

const styleForm = {
    width: '23rem',
    margin:"auto"
    
};


function Login(){
    return(

        <section className = "vh-100">
            <div className="container-fluid">
                <div className = "row">
                    <div className="col-sm 6 text-black">
                        
                            <div className='px-5 ms-xl-4'>
                                
                                    <img src='/images/logo.png' style={{height:'200px', width:"200px"}}></img>
                                
                            </div>
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                                <form style={styleForm}>
                                    <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                                    
                                    <div className="form-outline mb-4">
                                        <input type={'email'} className = "form-control form-control-lg" id='emailInput'></input>
                                        <label className="form-label" htmlFor='emailInput'>Email address</label>
                                    </div>
                                    
                                    <div className="form-outline mb-4">
                                        <input type={'password'} className = "form-control form-control-lg" id = "passwordInput"></input>
                                        <label className="form-label" htmlFor='passwordInput'>Password</label>
                                    </div>

                                    <div className='pt-1 mb-4'>
                                        <button className='btn btn-info btn-lg btn-block' typeof='button'>Login</button>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className='text-muted'>Forgot password?</a></p>
                                    <p>Don't have an account?<a className='link-info'>Register here</a></p>
                                </form>
                            </div>
                            
                            </div>
                            <div className='col-sm-6 px-0 d-none d-sm-block'>
                                <img src="/images/photographer.jpg" alt = "Login image" className='w-100 vh-100' style={{objectFit:"cover", objectPosition:"right"}}></img>
                            
                            </div>
                </div>

            </div>
        </section>
    );
        
}

export default Login;
