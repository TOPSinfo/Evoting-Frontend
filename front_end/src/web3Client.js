import Contractmap from './deployments/map.json';
import ContractAbi from './deployments/1337/0x0b772D86eEf3D957b8C1bFCB70fe4E012fDEa7D6.json'
import Web3 from 'web3';

let selectedAccount;
let evotingContract;
let isInitialized = false;
let contractAddress = "";


export const init = async () => {
    let provider = window.ethereum;

    let contractAddressList = Contractmap[1337]["EVoting"];
    contractAddress = contractAddressList[0];

    if (typeof provider !== 'undefined') {
        await provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Selected account is ${selectedAccount}`);
            })
            .catch((err) => {
                console.log(err);
                return;
            });

        await window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }

    const web3 = new Web3(provider);

    web3.eth.handleRevert = true;

    evotingContract = new web3.eth.Contract(ContractAbi.abi, contractAddress);

    isInitialized = true;

    console.log(`selected account ${selectedAccount}`)
    return selectedAccount;

};

export const getAddress = async () => {
    console.log("getAddress called");
    return selectedAccount;

}

export const getCandidates = async () => {
    if (!isInitialized) {
        await init();
    }
    let candidatesList;

    await evotingContract.methods
        .getCandidates()
        .call()
        .then((candidates) => {
            console.log(candidates)
            candidatesList = candidates;
        });

    return candidatesList;
};

export const addCandidate = async (candidateName) => {
    if (!isInitialized) {
        await init();
    }

    let response;
    console.log(selectedAccount);
    await evotingContract.methods
        .addCandidate(candidateName)
        .send({ from: selectedAccount })
        .then((resp) => {
            console.log(resp)
            response = resp.status;
        })
        .catch((err) =>
            console.log(err));

    return response;
}

export const castVote = async (candidatePos, aadhar) => {
    if (!isInitialized) {
        await init();
    }
    let repsonse;
    await evotingContract.methods
        .vote(candidatePos, aadhar)
        .send({ from: selectedAccount })
        .then((resp) => {
            repsonse = resp.status;
            console.log(resp)
        })
        .catch((err) =>
            console.log(err));

    return repsonse;
}


export const approveVoter = async (address, aadhar) => {
    if (!isInitialized) {
        await init();
    }

    let repsonse;
    await evotingContract.methods
        .approveVoter(address, aadhar)
        .send({ from: selectedAccount })
        .then((resp) => {
            repsonse = resp.status;
            console.log(resp)
        })
        .catch((err) =>
            console.log(err));

    return repsonse;
}

export const changePhase = async (phase) => {
    if (!isInitialized) {
        await init();
    }

    let repsonse;

    await evotingContract.methods
        .changeVotingPhase(phase)
        .send({ from: selectedAccount })
        .then((resp) => {
            repsonse = resp.status;
            console.log(resp.status)
        })
        .catch((err) =>
            console.log(err));

    return repsonse;
}

export const isApproved = async (aadhar, address) => {

    if (!isInitialized) {
        await init();
    }

    let response;
    console.log("is approved called");
    await evotingContract.methods
        .isVoterApproved(address, aadhar)
        .call()
        .then((resp) => {
            console.log(resp);
            response = resp;
        }
        )
        .catch((err) =>
            console.log(err));
    return response;

}


export const getWinner = async () => {

    if (!isInitialized) {
        await init();
    }

    let response;
    await evotingContract.methods
        .winnerName()
        .call()
        .then((resp) => {
            console.log(resp);
            response = resp;
        }
        )
        .catch((err) =>
            console.log(err.message));
    return response;

}


export const getVotingPhase = async () => {

    if (!isInitialized) {
        await init();
    }

    let response;
    await evotingContract.methods
        .getVotingPhase()
        .call()
        .then((resp) => {
            console.log(resp);
            response = resp;
        }
        )
        .catch((err) =>
            console.log(err.message));
    return response;

}

