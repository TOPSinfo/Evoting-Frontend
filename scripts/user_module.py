
from brownie import EVoting
from scripts.helpful_scripts import get_account

account = get_account()
evoting = EVoting[-1]


## cast the vote to a specific candidate
def castVote(candidadatePos,aadhar):
    try:
        evoting.vote(candidadatePos,aadhar,{"from":account})
    except Exception as e:
        print(e)


## check if a user is approved for voting
## input account no. and aadhar no.
def isApproved(address,aadhar):

    approved = False
    try:
        approved = evoting.isVoterApproved(address,aadhar)
    except Exception as e:
        print(e)
    
    return approved


## returns candidates list with no of votes they got
def getCandidates():
    candidates = None
    try:
        candidates = evoting.getCandidates()
    except Exception as e:
        print(e)

    return candidates


## get the name of the winner of the election
def winnerName():
    winner = ""
    try:
        winner = evoting.winnerName()
    except Exception as e:
        print(e)

    return winner



# def main():
#     candidate = getCandidates()

#     print(candidate[0][0])

    

