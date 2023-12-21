// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract EVoting {

    struct Voter {      
        bool voted;  // if true, that person already voted
        uint vote;   //indx of the candidadate they voting for
        string aadhar;  // aadhar of the voter
    }

    struct Candidate {
        string name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public admin;

    enum votingPhase{REGISTER,VOTING,CLOSED}
    votingPhase voting_phase;
    Candidate[] public candidates;
    Voter[] public SuccessfulVotersList;
    mapping(address => Voter) public voters;
    mapping (string => address) public approvedAadharToAddress;

    constructor() {
        admin = msg.sender;
        voting_phase = votingPhase.CLOSED;
    }

    modifier onlyOwner (){
        require(msg.sender == admin,"access denied");
        _;

    }

    // To check if a pair of aadhar and address is approved for voting
    function isVoterApproved(address _address, string memory _aadhar) public view returns(bool){
        address voterAddress = approvedAadharToAddress[_aadhar];
        if (voterAddress == _address){
            return true;
        }
        return false;

    }

    // give vote to a candidate
    function vote(uint candidate, string memory _aadhar) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted");
        require(isVoterApproved(msg.sender,_aadhar),"Voter not approved OR using different account");
        require(voting_phase == votingPhase.VOTING,"Voting has not started yet");
        sender.voted = true;
        sender.vote = candidate;
        candidates[candidate].voteCount ++;
        SuccessfulVotersList.push(sender);
    }

    // ADMIN - approve the Voter to make them eligible to cast their vote
    function approveVoter(address _address, string memory _aadhar) public onlyOwner {
        address voterAddress = approvedAadharToAddress[_aadhar];
        require(voterAddress == address(0),"Aadhar already approved with an account");
        require(voting_phase == votingPhase.REGISTER,"Registration not started yet");
        approvedAadharToAddress[_aadhar] = _address;

    }

    // ADMIN - add a new candidate to the candidate list 
    function addCandidate (string memory _name) public onlyOwner{
        require(voting_phase == votingPhase.REGISTER,"Registration not started yet");
        candidates.push(Candidate({
                name: _name,
                voteCount: 0
            }));
    }


    // ADMIN - function to change the phase of the voting
    function changeVotingPhase(uint256 phase) public onlyOwner{
        if (phase == 0) voting_phase = votingPhase.REGISTER ;
        if (phase == 1) voting_phase = votingPhase.VOTING ;
        if (phase == 2) voting_phase = votingPhase.CLOSED ;
    }

    // ADMIN - function to delete all the candidates
    function deleteAllCandidates() public onlyOwner{
        delete candidates;
    }

    function getVotingPhase() external view returns(string memory _votingPhase){
        if (voting_phase == votingPhase.CLOSED) _votingPhase = "closed";
        if (voting_phase == votingPhase.REGISTER) _votingPhase = "Registration";
        if (voting_phase == votingPhase.VOTING) _votingPhase = "Voting";
        return _votingPhase;
    }

    function winningcandidate() public view
            returns (uint winningcandidate_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningcandidate_ = p;
            }
        }
    }


    function winnerName() public view
            returns (string memory winnerName_)
    {
        require(voting_phase == votingPhase.CLOSED,"Voting has not finished yet");
        winnerName_ = candidates[winningcandidate()].name;
    }

    function getCandidates() public view returns(Candidate[] memory){

        return candidates;
    }
}
