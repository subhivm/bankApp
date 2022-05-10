import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
 
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })

  acno=""
  pswd=""

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

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
 var acno= this.loginForm.value.acno
 var pswd= this.loginForm.value.pswd
  console.log(this.acno,this.pswd);

 
 if(this.loginForm.valid){
  this.ds.login(acno,pswd)
  .subscribe((result:any)=>{
    if(result){
      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
      localStorage.setItem('token',JSON.stringify(result.token))
      alert(result.message)
      this.router.navigateByUrl("dashboard")
     }
  },
  (result)=>{
    alert(result.error.message)
  }

  )
   }
 else{
   alert("inavalid Form")
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
