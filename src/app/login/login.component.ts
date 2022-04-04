import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="Your Poerfect Banking Partner"
  accnum="account number please..."
  pswrd="password please..."

  acno=""
  pswd=""
  //database
  database:any={
   1000:{acno:1000,uname:"ram",password:1000,balance:5000},
   1001:{acno:1001,uname:"raj",password:1001,balance:6000},
   1002:{acno:1002,uname:"rav",password:1002,balance:5500}

  }


  constructor() { }

  ngOnInit(): void {
  }

  accnochange(event:any){
 this.acno=event.target.value
 console.log(this.acno);
  }
  passwordchange(event:any){
    this.pswd=event.target.value
    console.log(this.acno);
     }
   


  login(){
    
    
 var acno= this.acno
 //console.log(this.acno);
 
 var pswd= this.pswd
 let database=this.database
 if(acno in database){
 if(pswd==database[acno]["password"]){
alert("login sucessfully")
 }
 else{
   alert("incorrect password")
 }
 }
 else{
   alert("user does not exist!!")
 }
  }
// login using template referencing variable
// login(a:any,p:any){
//   console.log(a.value);
  
//   var acno= a.value
//   var pswd= p.value
//   let database=this.database
//   if(acno in database){
//   if(pswd==database[acno]["password"]){
//  alert("login sucessfully")
//   }
//   else{
//     alert("incorrect password")
//   }
//   }
//   else{
//     alert("user does not exist!!")
//   }
//    }
 
}
