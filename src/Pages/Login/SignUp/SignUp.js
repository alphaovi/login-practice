import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const SignUp = () => {

    const [signUpError, setSignUpError] = useState("")
    const {register, handleSubmit} = useForm();
    const {createUser} = useContext(AuthContext)


    const handleSignUp = (data) => {
        setSignUpError("")
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            console.log(result)
            toast("User Created Successfully")
        })
        .catch(err => {
            console.log(err.message)
            setSignUpError(err.message)
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <p className="text-2xl font-bold text-center">Sign Up</p>
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" className="input input-bordered"
                                        {...register("name", {
                                            required: "Enter Your Name"
                                        })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" className="input input-bordered"
                                        {...register("email", {
                                            required: "Email Addres is Required"
                                        })} />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" className="input input-bordered"
                                        {...register("password",
                                            { required: "Password is Required", minLength: { value: 6, message: "Password Must Be 6 Characters More" } })}

                                    />

                                    <label className="label">
                                        <Link to="/forgetpass" href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>

                                    {
                                        signUpError && <p className="text-red-600">{signUpError}</p>
                                    }
                                   
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>

                                <p>Already Have An Account <Link className="text-primary font-bold" to="/login">Login</Link></p>
                                <div className="divider">OR</div>
                                <div>
                                    <button className="btn btn-outline w-full">Continue With Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;