import { ChangeDetectorRef,Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FootballDataService} from "../../services/football-data.service";
import {BreadcrumbItem} from "../../models/breadcrumb-item";
import {MatchDetails} from "../../interfaces/match-details";
import { BehaviorSubject, Subject, timer } from 'rxjs';
import * as moment from 'moment';
import {diffBetweenDatesInMinutes} from "../../../assets/helperFunctions";
import { Web3Service } from 'src/app/services/Web3Service.service';
import { threadId } from 'worker_threads';
import { table } from 'src/app/interfaces/table';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  matchId: number;
  matchDetails: MatchDetails;
  competitionCode: string;
  breadcrumbItems: BreadcrumbItem[];
  moment: any = moment;
  matchClock: number;
  loading: boolean;
  matchClockSubscription : any;
  matchSubscription: any;

  headers = ["Bet","Home team","Away team","Match id","win"];
  val :table[] = [];
  private compoundToAddress : any;
  private accounts :any;
  private accountNumber : any;
  balance : any;
  private myContract :any;
  private cEthInstance :any;  
  public Name :any;
 public name: any;
 public bool : boolean = false;
 public isMakeBid : number ;
  private accoutData : any;
  public amount: number = 0;
  public awayTeam: number = 0;
  public homeTeam: number = 0;
  public A: number = 0;
  public pot : number = 0;
  public gamesIsFinished : boolean = false;
  public potBalance : number = 0;
  public minBet : number = 0;
  setInterval = setInterval;
ownerAddress:any;
  myBetsForMatchIdLen: number;
  matchIdArrLen: number;
  pool: any;
  cnt: any;
  flag: number=0;
  
  constructor(
    private route: ActivatedRoute,
    private footballDataService: FootballDataService,
    private web3 : Web3Service,
    private cd : ChangeDetectorRef
  ) {
    this.competitionCode = localStorage.getItem("lastCompetitionCode");
    this.web3.checkAndInstantiateWeb3()
    .then(async (checkConn: any) => {
      
      console.log('in checkConn');
      this.accoutData = await  this.web3.loadBlockChainData();
      this.myContract = await this.web3.getContract();
      this.pool = await this.web3.getPool();
      console.log('accountData');
      console.log(this.accoutData);
      this.accountNumber = this.accoutData[0];
      console.log(this.accountNumber  );
      console.log('myContract');
      console.log(this.myContract);
    
            })
           setInterval(()=>this.INC(),200000);
            setInterval(()=>this.checkStatusMatch(),10000);
            setInterval(()=>this.incInterest(),1800000);
            setInterval(()=>this.distributePrizes(),20000);
        
        //1800000
  }

  async ngOnInit(): Promise<void> {
    
    this.matchId = this.route.snapshot.params['matchId'];
    this.loading = true;
    this.footballDataService.getMatchDetails(this.matchId).subscribe((data:any) => {
      this.loading = false;
      this.matchDetails = data["match"];

      this.timerForMatchClock();
      this.timerForMatch();
      this.breadcrumbItems = [
        new BreadcrumbItem(
          this.matchDetails?.competition?.name || this.competitionCode,
          `/${this.competitionCode}`,
          false
        ),
        new BreadcrumbItem(
          "Match",
          `#`,
          true
        ),
      ];
    })
    this.accoutData = await  this.web3.loadBlockChainData();
    this.myContract = await this.web3.getContract();
    await this.myContract.getPotBalanceOfTheMatch.call(this.matchId,(err: any,res: any) => {

  
      this.potBalance= res/1e18;
         
      console.log(this.potBalance);
   })
   
 

  }

  ngOnDestroy(){
    this.matchClockSubscription.unsubscribe();
    this.matchSubscription.unsubscribe();
  }
  async  INC() {
    this.A++;
  } 

  private timerForMatch(){
    // update every minute
    const source = timer(1000 * 60, 1000 * 60);
    this.matchSubscription = source.subscribe(val => {
      this.footballDataService.getMatchDetails(this.matchId).subscribe((data : any)=> {
        this.matchDetails = data["match"];
      })
    });
  }

  private timerForMatchClock(){
    // update every minute
    const source = timer(1000, 1000 * 60);
    this.matchClockSubscription = source.subscribe(val => {
      this.calculateMatchClock();
    });
  }
  // the free pricing for the football-data.org API does not provide info about the match clock
  // therefore I calculate it using the start time and current time
  // because of this there may be differences compared to the actual match clock
  private calculateMatchClock(){
    if(this.matchDetails?.utcDate){
      let now = new Date();
      let startDate = new Date(this.matchDetails.utcDate);
      if(this.matchDetails.status === "IN_PLAY"){
        let diffInMinutes = diffBetweenDatesInMinutes(now, startDate);
        // if it is second half, subtract 18 minutes (15 minutes + injury time, extra time, etc)
        this.matchClock = this.isFirstHalf() ? diffInMinutes : diffInMinutes - 18;
      }
    }
  }

  private isFirstHalf(){
    if(this.matchDetails?.score){
      if(
        this.matchDetails.status === "IN_PLAY" &&
        this.matchDetails.score.halfTime?.homeTeam === null
      ){
        return true;
      }
    }
    return false;
  }
public async myFunc()
 {
    console.log('click');
    await this.myContract.gameIsOver.call(this.matchId,async(err:any,isGameEnded:any)=>{
      console.log('isGameEnded:',isGameEnded);
    })
    await this.myContract.isAlreadyMinted.call(this.matchId,async(err:any,res:any)=>{
     
      console.log('res:',res);})
console.log(this.A);
  
 console.log(this.matchDetails.score.fullTime.homeTeam);
 console.log(this.matchDetails.score.fullTime.awayTeam);
 console.log(this.matchDetails.status);
 console.log(this.matchId);
 
  }
  public async bet() {
    console.log('click');

  
    this.accoutData = await  this.web3.loadBlockChainData();
   
  
     await this.myContract.placeBet(this.matchId,this.homeTeam,this.awayTeam,{from: this.accoutData[0],value:this.amount*1e18}, (err:any,result:any)=>{
      console.log(result);
      this.bool = true;
     
     });
     await this.myContract.getPotBalance.call((err: any,res: any) => {

      
      this.potBalance= res/1e18;
         
      console.log(this.potBalance);
   })
   await this.myContract.getRes2.call({from:this.accoutData[0]},(err:any,res:any)=>{
    this.val = res;
       console.log(this.val);
   })
}
public async distributePrizes() {
  console.log('click');
  this.accoutData = await  this.web3.loadBlockChainData();
/*(await this.myContract.distributePrizes(this.matchId,this.matchDetails.score.fullTime.homeTeam,this.matchDetails.score.fullTime.awayTeam,{from:this.accoutData[0]},(err: any,res: any) => {
  
   console.log(res);

    }));
   */
  
  
    if(this.accoutData[0]==0x732453328C8BD6138fcB625640Dd68fB29ccF789&&this.matchDetails.status=="FINISHED"){//&&this.matchDetails.status=="FINISHED"){

      await this.myContract.gameIsOver.call(this.matchId,async(err:any,isGameEnded:any)=>{
        if(isGameEnded==false){
          console.log('isGameEnded',isGameEnded);
          (await this.myContract.distributePrizes(this.matchId,this.matchDetails.score.fullTime.homeTeam,this.matchDetails.score.fullTime.awayTeam ,{from:this.accoutData[0]},(err: any,res: any) => {
    
            console.log(res);
            this.flag=1;
             }));
            }
            })
      }
      
    
  
  
}

public async checkStatusMatch(){
  this.accoutData = await  this.web3.loadBlockChainData();
 //if(this.matchDetails.status=="IN_PLAY"&&this.accoutData[0]==0x732453328C8BD6138fcB625640Dd68fB29ccF789)
 if(this.accoutData[0]==0x732453328C8BD6138fcB625640Dd68fB29ccF789&&this.matchDetails.status=="IN_PLAY")
 {
   await this.myContract.gameIsOver.call(this.matchId,async(err:any,isGameEnded:any)=>{

   if(isGameEnded==false){
     
   await this.myContract.isAlreadyMinted.call(this.matchId,async(err:any,res:any)=>{
     
     console.log('res:',res);
     if(res==false){
    await this.myContract.mint(this.matchId,{from:this.accoutData[0]},(err:any,res:any)=>{
      console.log("mint");
    })
  }
   })
  }
  })
 }
}
public async incInterest(){
  
  this.accoutData = await  this.web3.loadBlockChainData();
  //if(this.accoutData[0]==this.ownerAddress){
    if(this.accoutData[0]==0x732453328C8BD6138fcB625640Dd68fB29ccF789&&this.matchDetails.status=="IN_PLAY"){
      await this.myContract.gameIsOver.call(this.matchId,async(err:any,isGameEnded:any)=>{
        if(isGameEnded==false){
  await this.pool.getActiveMatchesLen.call(async(err:any,len:any)=>{
    len =len.toNumber();
    console.log(len);
    if(len>0){
    await this.pool.incInterest({from:this.accoutData[0]},(err:any,res:any)=>{
      console.log("incInterest")
      this.A++;
    
    })
  }
  })
}
})
}
  
}

/*public async sendToCoumpound(){

 const contractAddress = "0x17bf88E700435859cAc6aA773Fad117c9E1d13E8";
  /*this.accoutData = await  this.web3.loadBlockChainData();
  await this.myContract.sendToCoumpound(contractAddress,{from:this.accoutData[0]},(err : any,res:any)=>{
    console.log(res);
  });
  
}
await this.myContract.getPotBalnce.call((err:any,res:any) =>{
  res = res.toNumber();
  this.pot = res;
  console.log(res);
})
this.accoutData = await  this.web3.loadBlockChainData();
this.compound = await this.web3.getCompound();
this.myContract.getContractAsAddress.call((err:any,res:any)=>{
 
  res = res+ "";
  this.compoundToAddress = res;
  this.compoundToAddress= this.compoundToAddress+"";
  console.log(res+"");
})
/*this.compound.mint({from:"0x86d77603d9F96c4B5ba6544d436FeFC38Ce4a949",value :this.pot,gas:25000000},((err:any,res:any)=>{

}));
const c=await this.myContract.sendToCompound("0x859e9d8a4edadfedb5a2ff311243af80f85a91b8",{from:this.accoutData[0]},(err:any,res:any)=>{
console.log(res);
})
console.log(c);
}*/




}