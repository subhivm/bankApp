import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //database
  database:any={
    1000:{acno:1000,uname:"ram",password:1000,balance:5000},
    1001:{acno:1001,uname:"raj",password:1001,balance:6000},
    1002:{acno:1002,uname:"rav",password:1002,balance:5500}
 
   }
 
  constructor() { }
  //Register component will give unmae,acno,password
  register(uname:any, acno:any, password:any){
    let database=this.database
    if(acno in database){
      //already existing account
      return false
    }
    else{
     database[acno]={
       acno,
       uname,
       password,
       balance:0

     }
     //console.log(database);
     return true
     
    }
  }

  //login
  login(acno:any,pswd:any){
    let database=this.database
    if(acno in database){
    if(pswd==database[acno]["password"]){
      return true
     }
    else{
        alert("incorrect password")
        return false
      }
    }
    else{
          alert("user does not exist!!")
          return false
        }
     }
   

//deposit logic defined here
deposit(acno:any,pswd:any,amt:any){
 var  amount=parseInt(amt)
  let database=this.database
 
  if(acno in database){
     if(pswd==database[acno]["password"]){
       database[acno]["balance"]+=amount
       return database[acno]["balance"]
     }
     else{
       alert("incorrect password")
       return false
     }
  }
  else{
     alert("user does not exist ")
     return false
  }
}

//withdraw logic defined here
withdraw(acno:any,pswd:any,amt:any){
  var  amount=parseInt(amt)
   let database=this.database
  
   if(acno in database){
      if(pswd==database[acno]["password"]){
        if(database[acno]["balance"]>amount){
          database[acno]["balance"]-=amount
          return database[acno]["balance"]
  
        }
        else{
          alert("Insufficient balance!!!")
          return false
  
        }
      }
      else{
        alert("Incorrect password!!!!")
        return false
      }
   }
   else{
      alert("User does not exist !!!!")
      return false
   }
 }
 
}
