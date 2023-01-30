import './auth.css';
import image from '../../assets/auth_image.png';
import logo from '../../assets/parach_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';
import { useRecoilState } from 'recoil'
import { userState } from '../atom/UserAtom'
import { gapi } from "gapi-script";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { provider } from '../../firebase';
import { facebookAuth } from '../../firebase';
// import { signInWithGoogle } from '../../firebase';





function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const [user, setUser] = useRecoilState(userState)


    const navigate = useNavigate();

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


    //popup closed by user error solved with gapi script 

    useEffect(() => {

        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                navigate('/dashboard')
                // ...
            })
            .catch((error) => {
                setError(true)
                // ..
            });

    }

    return (
        <div className="auth">
            <div className="signup_comp">
                <img className="signup_logo" src={logo} alt=" parach logo" />
                <p className="logo_text">arch ICT Academy</p>

            </div>
            <div className="signup_card">

                <div className="card">
                    <div className="card_top">

                        <h2 className='welcome_text'>Login</h2>
                        <img className="signup_image" src={image} alt="differnt tech solutions" />
                        <form action="" onSubmit={handleSubmit} className="signup_form">
                            <div className="">
                                <label className='signup_label' htmlFor="name">Email</label>
                                <input type="email" className='signup_input' name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="">
                                <label className='signup_label' htmlFor="name">Password</label>
                                <input type="password" className='signup_input' name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                            <button className='signup_btn' type="submit">Submit</button>
                            {error && <span className='error_msg'>Wrong email or password!</span>}
                            <div className='signup_link'>
                                <p >Don't have an account?
                                    <Link to="/signup" style={{ textDecoration: "none", color: "teal", padding: '5px' }}>
                                        signup
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
                                autoLoad={true}
                                fields="name,email,picture"
                                icon="fa-facebook"
                                cssClass="facebook-btn"
                                callback={responseFacebook}

                            />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Signin