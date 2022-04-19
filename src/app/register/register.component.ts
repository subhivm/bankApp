import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registerForm Model
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })
// acno=""
// pswd=""
// uname=""
  constructor(private db:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
if( this.registerForm.get('uname')?.errors) {
  alert("invalid username!!")
}

    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd
    var uname=this.registerForm.value.uname
    
    if(this.registerForm.valid){
      const result=this.db.register(uname,acno,pswd)
    
      if(result){
        alert("successfully registerd")
        this.router.navigateByUrl("")//redirect to login,so data injection done at class router
      }
      else{
        alert("Account already exist ..Please Sign  In")
      }

    }
    else{
      alert("invalid form!!")
    }
  }
}
