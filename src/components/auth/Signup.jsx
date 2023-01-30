import './auth.css';
import image from '../../assets/auth_image.png';
import logo from '../../assets/parach_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useRecoilState } from 'recoil'
import { userState } from '../atom/UserAtom'
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { provider } from '../../firebase';
import { facebookAuth } from '../../firebase';

import { gapi } from "gapi-script"
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'




function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [user, setUser] = useRecoilState(userState)

    const navigate = useNavigate()


    const responseGoogle = () => {
        // console.log(response);
        signInWithPopup(auth, provider).then((result) => {
            // console.log(result);
            // console.log(result.user.email);
            const user = result.user
            setUser(user);
            navigate("../dashboard")
        }).catch((error) => {
            console.log(error);
        })

    }

    // const responseFacebook = (response) => {
    //     console.log(response);
    // };
    const responseFacebook = () => {
        signInWithPopup(auth, facebookAuth).then((result) => {
            // console.log(result);
            // console.log(result.user.email);
            const user = result.user
            setUser(user);
            navigate("../dashboard")
        }).catch((error) => {
            console.log(error);
        })
    }


    const clientId = "786206504737-4r0gcofs85jnsbhso0d7pr3ag4ilm1fn.apps.googleusercontent.com"

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])


    const signupForm = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/signin')
                // navigate('/dashboard')
                // ...
            })
            .catch((error) => {
                setError(true)
                console.log(error);
            });

    }

    // useEffect(() => {
    //     /*global google */
    //     google.accounts.id.initialize({
    //         client_id: "786206504737-4r0gcofs85jnsbhso0d7pr3ag4ilm1fn.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     });
    //     google.accounts.id.renderButton(
    //         document.getElementById("google_btn"),
    //         { theme: "outline", size: "large", width: "60vw" }
    //     );
    // }, [])


    return (
        <div className="auth">
            <div className="signup_comp">
                <img className="signup_logo" src={logo} alt=" parach logo" />
                <p className="logo_text">arch ICT Academy</p>

            </div>
            <div className="signup_card">

                <div className="card">
                    <h2 className='welcome_text'>Signup</h2>

                    <div className="card_top">
                        <img className="signup_image" src={image} alt="differnt tech solutions" />
                        <form onSubmit={signupForm} action="" className="signup_form">
                            <div className="">
                                <label className='signup_label' htmlFor="name">Username</label>
                                <input className='signup_input' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="">
                                <label className='signup_label' htmlFor="name">Email</label>
                                <input type="email" className='signup_input' name="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="">
                                <label className='signup_label' htmlFor="name">Password</label>
                                <input type="password" className='signup_input' name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                            <button className='signup_btn' type="submit">Submit</button>
                            {error && <span className='error_msg'>Password must be at least 6 characters!</span>}

                            <div className='signup_link'>
                                <p >Already have an account?
                                    <Link to='/signin' style={{ textDecoration: "none", color: "teal", padding: '5px' }}>
                                        signin
                                    </Link>
                                </p>

                            </div>
                        </form>
                    </div>

                    <div className="line">
                        <div className="line1"></div>
                        <p>or</p>
                        <div className="line2"></div>
                    </div>
                    <div className="socials_auth">
                        <div id="google_btn">

                            <GoogleLogin
                                clientId={clientId}
                                // buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <button id='btnGoogle' className='fa fa-google' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
                                )}
                            />

                        </div>
                        <div className="facebook">
                            <FacebookLogin
                                appId="463988219177785"
                                autoLoad={false}
                                fields="name,email,picture"
                                // onClick={componentClicked}
                                callback={responseFacebook}
                                icon="fa-facebook"
                                cssClass="facebook-btn"
                                render={renderProps => (
                                    <button onClick={e => {
                                        console.trace();
                                    }}>Login</button>
                                )}

                            />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Signup