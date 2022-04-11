import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

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

  constructor(private router:Router,private ds:DataService) { }

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
 let result=this.ds.login(acno,pswd)
 if(result){
   alert("login sucessfully")
   this.router.navigateByUrl("dashboard")
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
