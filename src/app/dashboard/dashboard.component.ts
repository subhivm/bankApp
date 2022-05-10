import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  user:any //to hold username
 acno:any

  depositForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

})


// acno1=""
// pswd1=""
// amount1=""

withdrawForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
})

loginDate:any

constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
  this.user=JSON.parse(localStorage.getItem('currentUser')||'')
  this.loginDate=new Date()
 }
 
  ngOnInit(): void {
    // if(!localStorage.getItem("currentAcno")){
    //   alert("please login...")
    //   this.router.navigateByUrl("")
    // }
  }
  deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      //calling deposit in data service
      this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )

    }
    else{
      alert("invalid form")
    }
   }
 
 
  withdraw(){
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amount=this.withdrawForm.value.amount
  
    if(this.withdrawForm.valid){
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )

   }
   else{
    alert("invalid withdraw data")
  }


  }


  //logout function
  logOut(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
  }

//to delete the account
  deletefromParent(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }


  //oncancel
  onCancel(){
    this.acno=""
  }


  //onDelete
  onDelete(event:any){
    //calling onDelete in dataservice
    this.ds.onDelete(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
  }
}
