
import React, { useState, useEffect } from 'react'
import '../cssFiles/admin.css'
import NavbarAdmin from '../components/NavbarAdmin';
import { addCandidate, init } from '../web3Client';
import { addCandidates } from '../models/candidates';
import { Alert } from "@material-ui/lab"
import { Snackbar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  breadcum: {
    marginLeft: "260px",
    fontSize: "25px",
    fontWeight: "bold",
  },
  logutBtn: {
    float: "right",
    marginRight: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "15px",
    backgroundColor: "rgba(10, 126, 28)",
    color: "white",
  },
  headerContent: {
    flexDirection: "row",
  }
});


function AdminAddCandidate() {

  const classes = useStyles();

  const [walletAddress, setWalletAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateAge, setCandidateAge] = useState(0);
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [candidatePartySymbol, setCandidatePartySymbol] = useState("");
  const [candidateQualification, setCandidateQualification] = useState("");
  const [candidateAdded, setCandidateAdded] = useState(false);

  const [inputs, setInputs] = useState({ full_name: "", party_name: "", qualification: "", age: 0 });

  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleCloseSnack = () => {
    showSuccess && setShowSuccess(false)
    showError && setShowError(false)
  }

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  useEffect(() => {

    init().then((account) => {
      setWalletAddress(account);
    })
  }, []);

  function addCandidateToList(e) {
    e.preventDefault();

    setCandidateName(inputs.full_name)

    console.log(candidateName)
    addCandidate(candidateName).then((resp) => {
      setCandidateAdded(resp)
      if (resp) {
        addCandidates(inputs).then((response) => {
          console.log(response)
          if (response === 1) {
            setInputs({ full_name: "", party_name: "", qualification: "", age: 0 })
            !showSuccess && setShowSuccess(true)
            setSuccessMsg("Candidates added successfully!")
          } else {
            !showError && setShowError(true);
            setErrorMsg("Candidate is not added!");
          }
        })
      } else {
        !showError && setShowError(true);
        setErrorMsg("your transaction is failed! Please you are in Registration phase & you are admin!");
      }
    }).catch((error) => {
      console.log(error.message)
    })
  }


  return (
    <>
      <div className={classes.headerContent}>
        <div className={classes.breadcum}>Add Candidate</div>
      </div>
      <div className='registration'>
        <NavbarAdmin />
        <div className="row container my-3">
          <div className="col-lg-12 col-md-6 col-sm-6 col-xs-6">
            <form onSubmit={addCandidateToList}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" className="form-control" placeholder="Full Name" id="full_name" name="full_name" onChange={onChange} />
              </div>
              <div className="form-group my-2">
                <label htmlFor="email">Party Name</label>
                <input type="text" className="form-control" placeholder="Party Name" id="party_name" name="party_name" onChange={onChange} />
              </div>
              <div className="form-group my-2">
                <label htmlFor="email">Age</label>
                <input type="text" className="form-control" placeholder="Age" id="age" name="age" onChange={onChange} />
              </div>
              <div className="form-group my-2">
                <label htmlFor="password">Qualification</label>
                <input type="text" className="form-control" placeholder="Qualification" id="qualification" name="qualification" onChange={onChange} />
              </div>
              <div className="form-group my-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="reset" className="btn btn-secondary mx-5">Reset</button>
                {/* <Link to="" className="btn btn-link mx-3 float-end">Forget Passwors</Link> */}
              </div>
            </form>
          </div>
          <br></br>
          <p>Connected to wallet account :  {walletAddress === undefined ? "Please connect to yor Metamask wallet account" : walletAddress}</p>
        </div>
        <br></br>
        {/* <h5>{candidateAdded ? 'Candidate Approved Successfully' : ''}</h5> */}
      </div>
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
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

export default AdminAddCandidate