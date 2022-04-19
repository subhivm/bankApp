import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any //declare it to hold the name of successfully loged in person
  currentAcno:any
  
 
  //database
  database:any={
    1000:{acno:1000,uname:"ram",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"raj",password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,uname:"rav",password:1002,balance:5500,transaction:[]}
   }
 
  
   constructor() {
    this.getDetails()
   }


   //create a function for store data on local storage
   saveDetails(){
     localStorage.setItem("database",JSON.stringify(this.database))
     if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))

     }
     if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))

     }

   }


   //to get data from local storage
  getDetails(){
  if(localStorage.getItem("database")){
    this.database=JSON.parse(localStorage.getItem("database")||'')
  }
  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }
  if(localStorage.getItem("currentUser")){
    this.currentUser=JSON.parse(localStorage.getItem("currentUser")||'')
  }
}

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
       balance:0,
       transaction:[]

     }
     //console.log(database);
     this.saveDetails()
     return true
     
    }
  }

  
  
  //login
  login(acno:any,pswd:any){
    let database=this.database
    if(acno in database){
    if(pswd==database[acno]["password"]){
      this.currentUser=database[acno]["uname"] //to get username to loginpage
      this.currentAcno=acno
      this.saveDetails()
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
       database[acno]["transaction"].push(
         {
          type:"credit",
          amount:amount
         }
       )
       //console.log(database);
       this.saveDetails()

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
          database[acno]["transaction"].push(
            {
             type:"debit",
             amount:amount
            }
          )
   //console.log(database);
   this.saveDetails()

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

 transaction(acno:any){
   return this.database[acno].transaction
 }
 
}
