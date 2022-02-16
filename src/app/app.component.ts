import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/Web3Service.service';
import {custom} from './components/shared/custom';
import {table} from '../app/interfaces/table';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-football';
  amountBet:number;
  homeTeam:number;
  awayTeam:number;
  match:number;
  isWinner:boolean;
  headers = ["Bet","Home team","Away team","Match id","win"];
  accoutData: string;
  myContract: any;
  accountNumber: string;
  
  val :table[] = [];
  v:table;
  counter : number=0;
  myBetsForMatchIdLen: any;
  matchIdArrLen: number;

  
  constructor( private web3 : Web3Service){
    this.web3.checkAndInstantiateWeb3()
    .then(async (checkConn: any) => {
      
      console.log('in checkConn');
      this.accoutData = await  this.web3.loadBlockChainData();
      this.myContract = await this.web3.getContract();
     // this.cEthInstance = await this.web3.getCompound();
      console.log('accountData');
      console.log(this.accoutData);
      this.accountNumber = this.accoutData[0];
      console.log(this.accountNumber  );
      console.log('myContract');
      console.log(this.myContract);
    
            })
           
  }
  
  async ngOnInit(): Promise<void> {
    let customObj = new custom();
   /* customObj.address = 0x223;
    customObj.isWinner = false; 
    customObj.homeTeamScore = 0;
    customObj.awayTeamScore = 1;
    customObj.amountBet = 2;*/
    this.accoutData = await  this.web3.loadBlockChainData();
    this.myContract = await this.web3.getContract();
    
    //this.arr.push(customObj);
  
   
   
  }
  }


