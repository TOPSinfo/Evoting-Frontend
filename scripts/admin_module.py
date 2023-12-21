from brownie import accounts,EVoting,network,config
from scripts.helpful_scripts import get_account


account = get_account()
evoting = EVoting[-1]


## function to add a new candidate for voting
def addCandidate(name):
    try:
        evoting.addCandidate(name,{"from":account})
    except Exception as e:
        print(e)


## set phase of voting
# 0 = Registration
# 1 = Voting
# 2 = Closed
# default phase will be closed
def changeVotingPhase(phaseInt):
    if phaseInt in [0,1,2]:
        try :
            evoting.changeVotingPhase(phaseInt,{"from":account})
        except Exception as e :
            print(e)
    else:
        print("wrong choice please select from 0,1,2")


## address = string, aadhar = int 
## to approve a pending voter registration request
def approveVoter(address,aadhar):
    try:
        evoting.approveVoter(address,aadhar,{"from":account})
    except Exception as e :
        print(e)

    