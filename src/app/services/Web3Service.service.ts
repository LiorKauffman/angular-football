
   
import {Injectable} from '@angular/core';

//const contractOne = require('../../../build/contracts/contractOne.json');

//const Web3 = require('web3');
import Web3 from 'web3';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private messageResult: any;

  constructor() {
  }

  public checkAndInstantiateWeb3(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        resolve(this.messageResult);
      } else if (window.web3) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.web3.currentProvider);
        console.log(window.web3.currentProvider);
        resolve(this.messageResult);
      } else {
        this.messageResult = 'No Erthereum browser detected. you should consider trying MetaMask';
        reject(this.messageResult);
      }
    });
  }

  public loadBlockChainData(): Promise<string> {
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      var account;
      web3.eth.getAccounts(function(error: any, accounts: any) {
          account = accounts;
        console.log(account);
      
      
     console.log('account');
      console.log(account);
      if (account != undefined) {
          console.log('account != undefined');
        resolve(account);
      } else {
        const messageResult = 'There is no account';
        reject(messageResult);
      }
    })
    });
  }
public getPool() {
    const web3 = window.web3;
    const compoundAddress = "0x390575aa12265039a9770AA74fD467ec290020fF";
    const abi =[
        {
            "inputs": [],
            "name": "incInterest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "bets",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "activeMatches",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "alreadyMint",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getActiveMatchesLen",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "getBetsWithInterest",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "moneyForGame",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
 const contractAbi =  web3.eth.contract(abi);
const contract = contractAbi.at(compoundAddress);
return contract;
}
  public getContract() {
    
      const web3 = window.web3;
          const contractAddress = "0xEb39fbaF472dB1B7790AaB00b3ea40C7A2D1978b";
       //   const abi = contractOne['abi'];
       const abi=[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_realHomeTeamScore",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_realAwayTeamScore",
                    "type": "uint256"
                }
            ],
            "name": "distributePrizes",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllMoney",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_awayTeam",
                    "type": "uint256"
                }
            ],
            "name": "placeBet",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "returnMoneyToHost",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "cont",
                    "type": "address"
                }
            ],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "placeBetEvent",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "activeMatches",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "checkMatchIdAlreadyExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "checkPlayerExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "gameIsOver",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getActiveMatchesLen",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPotBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "getPotBalanceOfTheMatch",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRes2",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "amountBet",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "awayTeam",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "homeTeam",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isWinner",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "myAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct winPool.player[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "isAlreadyMinted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "isGameEnded",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "isGameMinted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "matchId",
                    "type": "uint256"
                }
            ],
            "name": "len",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "matchIdArr",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minBet",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "moneyForGame",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "numberOfBets",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "numberOfBetsPerMatchId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ourpool",
            "outputs": [
                {
                    "internalType": "contract ourPool",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ownerPayable",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "playerId",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "playerIdPerMatchId",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "players",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "playersPerMatchId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "playersPerMatchId2",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pot",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "potPerMatchId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "realScore",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "updated",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "res",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "res2",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "res3",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "amountBet",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "awayTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "homeTeam",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isWinner",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "myAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "returnMatchIdArrLen",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tenPercent",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "tenPercentPerMatchId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "totalBetsPerMatchId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
          console.log(abi);
          //const networkAddress = contractOne;
          const marketplace =  web3.eth.contract(abi);
        const contract = marketplace.at(contractAddress);
         return contract;

  }

  public convertPriceToEther(price:any) {
    const web3 = window.web3;
    return web3.utils.toWei(price.toString(), 'Ether');
  }

  public convertEtherToPrice(price:any) {
    const web3 = window.web3;
    return web3.utils.fromWei(price.toString(), 'Ether');
  }

  public getEtherBalance(account:any) {

    
      const web3 = window.web3;
      console.log(account);
      var balance;
      web3.eth.getBalance(account,function(error: any,result: any){

        if(error){
           console.log(error)
        }
        else{
         balance = result;
         console.log(balance);
        }
       
     })
 
     return balance;
  }

}
