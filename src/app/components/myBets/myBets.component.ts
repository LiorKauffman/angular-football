import {BreadcrumbItem} from "../../models/breadcrumb-item";
import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { Web3Service } from 'src/app/services/Web3Service.service';
import {table} from '../../interfaces/table';
import { FootballDataService } from "src/app/services/football-data.service";
import { ActivatedRoute } from "@angular/router";
import {Match} from "../../interfaces/match";
import { interval } from 'rxjs';

@Component({
  selector: 'app-myBets',
  templateUrl: './myBets.component.html',
  styleUrls: ['./myBets.component.css'],
})
export class myBetsComponents {
  amountBet:number;
  homeTeam:number;
  awayTeam:number;
  inverval;
  isWinner:boolean;
  headers = ["Bet","Home team","Away team","Match id","win"];
  accoutData: string;
  myContract: any;
  accountNumber: string;
  matchIdArrLen:number;
  myBetsForMatchIdLen:number;
  
  val :table[] = [];
  v:table;
  counter : number=0;
  competitionName: any;
  loading: boolean;
  competition: any;
  breadcrumbItems: BreadcrumbItem[];
  matches: any;
  interval: any;

  
  constructor( private web3 : Web3Service, private route: ActivatedRoute,
    private footballDataService: FootballDataService){
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
   
   /* customObj.address = 0x223;
    customObj.isWinner = false; 
    customObj.homeTeamScore = 0;
    customObj.awayTeamScore = 1;
    customObj.amountBet = 2;*/
    this.competitionName = this.route.snapshot.params.competitionName;
    localStorage.setItem("lastCompetitionCode", this.competitionName);
    this.loading = true;
    this.footballDataService.getMatches(this.competitionName).subscribe(
      data => {
      this.loading = false;
      this.competition = data["competition"];
      this.matches = data["matches"];
      this.breadcrumbItems = [new BreadcrumbItem(this.competition.name, "#", true)]
      // call every minute
      this.interval = interval(1000 * 60).subscribe(value => {
        this.getMatchInfos();
      })
    },
      error => {
        console.log(error.error.message);
        this.loading = false;
      })
    this.accoutData = await  this.web3.loadBlockChainData();
    this.myContract = await this.web3.getContract();
    
    //this.arr.push(customObj);
    await this.myContract.returnMatchIdArrLen.call({from:this.accoutData[0]},async(err:any,res:any)=>{
      res=res.toNumber();
      this.matchIdArrLen=res;
      console.log(this.matchIdArrLen);
      for (var i = 0; i < this.matchIdArrLen; i++) {
      await this.myContract.len.call(i,{from:this.accoutData[0]},async(err:any,res:any)=>{
        res=res.toNumber();
        this.myBetsForMatchIdLen=res;
        console.log(this.myBetsForMatchIdLen);
        for(var j=0; j<this.myBetsForMatchIdLen;j++)
        {
          await this.myContract.getRes3.call(i,j,{from:this.accoutData[0]},(err:any,res:any)=>{
            let v1 = new table();
          res[0] = res[0].toNumber()/1e18;
          res[1] = res[1].toNumber();
          res[2] = res[2].toNumber();
          res[3] = res[3].toNumber();
          console.log(res[0]);
          console.log(res[1]);
          console.log(res[2]);
          console.log(res[3]);
          v1.amountBet=res[0];
          v1.homeTeam=res[1];
          v1.awayTeam=res[2];
          v1.match=res[3];
          v1.isWinner=res[4];
         // this.val.push(res[0],res[1],res[2],res[3],res[4]);
         this.val.push(v1);
         console.log(v1);
          console.log(this.val);
          })

          
        }
      })

    }
    })
   
  }
  private getMatchInfos(){
    this.footballDataService.getMatches(this.competitionName).subscribe(
      data => {
      this.matches = data["matches"];
    },
      error => {
        console.log(error.error.message);
        this.loading = false;
      })
  }
  }
/*await this.myContract.res3Len.call({from:this.accoutData[0]},async(err:any,res:any)=>{
      res = res.toNumber();
      this.counter = res;
      console.log(res);
      for (var i = 0; i < this.counter; i++) {
      
        await this.myContract.getRes3.call(i,,j{from:this.accoutData[0]},(err:any,res:any[])=>{
           let v1 = new table();
          res[0] = res[0].toNumber()/1e18;
          res[1] = res[1].toNumber();
          res[2] = res[2].toNumber();
          res[3] = res[3].toNumber();
          console.log(res[0]);
          console.log(res[1]);
          console.log(res[2]);
          console.log(res[3]);
          v1.amountBet=res[0];
          v1.homeTeam=res[1];
          v1.awayTeam=res[2];
          v1.match=res[3];
          v1.isWinner=res[4];
         // this.val.push(res[0],res[1],res[2],res[3],res[4]);
         this.val.push(v1);
         console.log(v1);
          console.log(this.val);
        
        })
      }
    })*/