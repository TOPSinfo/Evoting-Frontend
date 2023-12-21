from brownie import accounts, config, EVoting, network
from .helpful_scripts import get_account
from .updatefrontend import update_front_end


def deploy_Evoting():
    account = get_account()
    EVoting.deploy({"from": account})
    update_front_end()


def main():
    print("deploy hello")
    deploy_Evoting()
