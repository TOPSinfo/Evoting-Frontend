import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom"
import { Alert } from "@material-ui/lab"
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
        color: "whi",
        textAlign: "center",
    }
});

export const Login = () => {
    const classes = useStyles();

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ email: "", password: "" });

    // const [showSuceess, setShowSuceess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleCloseSnack = () => {
        // showSuceess && setShowError(false)
        showError && setShowError(false)
    }

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs;

        const response = await fetch(BASE_AUTH_URL + "auth/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const jsonRes = await response.json();
        console.log("res:", response.status);
        console.log("res1:", jsonRes);

        if (response.status === 200) {
            localStorage.setItem("uid", jsonRes['uid']);
            navigate('/dashboard');
        } else {
            !showError && setShowError(true);
            setErrorMsg(jsonRes['detail']);
        }
    }

    return (
        <>
            <div className={classes.box}>
                <div className="container">
                    <div className="card col-6 offset-3">
                        <div className="card-body">
                            <Link to="/" className="btn btn-link mx-3 float-end">Create Account</Link>
                            <h1 className={classes.header}> Login! </h1>
                            <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group my-2">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" placeholder="Email ID" id="email" name="email" onChange={onChange} />
                                        </div>
                                        <div className="form-group my-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password" id="password" name="password" onChange={onChange} />
                                        </div>
                                        <div className="form-group my-2">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                            <Link to="" className="btn btn-link mx-3 float-end">Forget Passwors</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </>
    )
}