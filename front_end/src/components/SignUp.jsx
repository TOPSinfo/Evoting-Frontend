import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, Link } from "react-router-dom"
import { BASE_AUTH_URL } from "../helper/constants";

const useStyles = makeStyles({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    box: {
        padding: "10px",
        marginTop: "50px",
    },
    header: {
        textAlign: "center",
    }
});

export const SignUp = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    // const baseUrl = "http://127.0.0.1:8000/api/v1/";

    const [inputs, setInputs] = useState({ full_name: "", email: "", password: "" });

    const [errors, setErrors] = useState({ full_name: "", email: "", password: "" });

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { full_name, email, password } = inputs;

        const response = await fetch(BASE_AUTH_URL + "auth/signup/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name, email, password })
        });

        const jsonRes = await response.json();
        console.log("res:", response.status);
        console.log("res1:", jsonRes);

        if (response.status === 201) {
            navigate('/login');
        } else {
            setErrors({
                full_name: jsonRes['full_name'] !== undefined ? jsonRes['full_name'][0] : "",
                email: jsonRes['email'] !== undefined ? jsonRes['email'][0] : "",
                password: jsonRes['password'] !== undefined ? jsonRes['password'][0] : "",
            });
        }
    }

    return (
        <div>
            <div className="container">
                <div className="card col-6 offset-3">
                    <div className="card-body">
                        <Link to="/login" className="btn btn-link mx-3 float-end">Go To Login</Link>
                        <h1 className={classes.header}> Sign Up! </h1>
                        <div className="row">
                            <div className="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input type="text" className="form-control" placeholder="Full Name" id="full_name" name="full_name" onChange={onChange} />
                                        {
                                            errors['full_name'] !== '' ?
                                                <span className="badge text-danger">{errors['full_name']}</span> :
                                                <span></span>
                                        }
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" placeholder="Email ID" id="email" name="email" onChange={onChange} />
                                        {
                                            errors['email'] !== '' ?
                                                <span className="badge text-danger">{errors['email']}</span> :
                                                <span></span>
                                        }
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Password" id="password" name="password" onChange={onChange} />
                                        {errors['password'] !== '' ?
                                            <span className="badge text-danger">{errors['password']}</span> :
                                            <span></span>}
                                    </div>
                                    <div className="form-group my-2">
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                        {/* <Link to="" className="btn btn-link mx-3 float-end">Forget Passwors</Link> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}