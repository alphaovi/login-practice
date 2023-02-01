import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import app from '../../../firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/"

    const handleLogin = (data) => {
        console.log(data)
        setLoginError("")
        signIn(data.email, data.password)
            .then(result => {
                console.log(result)
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.log(err.message)
                setLoginError(err.message)
            })

        // sign in with google
        if (error) {
            return (
                <div>
                    <p>Error: {error.message}</p>
                </div>
            );
        }
        if (loading) {
            return <p>Loading...</p>;
        }
        if (user) {
            return (
                <div>
                    <p>Signed In User: {user.email}</p>
                </div>
            );
        }
    }
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <div className="card-body">
                                    <div className="form-control">
                                        <p className="text-2xl font-bold text-center">Login</p>
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="Email" className="input input-bordered"
                                            {...register("email", {
                                                required: "Email Addres is Required"
                                            })}
                                        />

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="Password" className="input input-bordered"
                                            {...register("password",
                                                { required: "Password is Required", minLength: { value: 6, message: "Password Must Be 6 Characters More" } })}

                                        />
                                        {
                                            loginError && <p className="text-red-600">{loginError}</p>
                                        }

                                        <label className="label">
                                            <Link to="/forgetpass" href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                        </label>
                                    </div>
                                    <div>
                                        {

                                        }
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Login</button>
                                    </div>
                                    <p>New To Doctors Portal? <Link className="text-primary font-bold" to="/signup">Sign Up</Link></p>
                                    <div className="divider">OR</div>
                                    <div>
                                        <button onClick={() => signInWithGoogle()} className="btn btn-outline w-full">Continue With Google</button>
                                        {
                                            error?.message && <p>Google Login problem : {error.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;