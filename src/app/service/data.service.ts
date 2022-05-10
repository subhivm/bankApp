import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//let declare headers globally
const options={
  headers:new HttpHeaders()
}

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
 
  
   constructor(private http:HttpClient) {
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
    const data={
      uname,
      acno,
      password
    }
   return this.http.post('http://localhost:3000/register',data)
  }

  
  
  
  //login
  login(acno:any,pswd:any){
    const data={
      acno,
      pswd
    }
   return this.http.post('http://localhost:3000/login',data)

     }
   


     //deposit logic defined here
    deposit(acno:any,pswd:any,amt:any){
      const data={
        amt,
        acno,
        pswd
      }
      //api call
     return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
  
}
getOptions(){
  //to fetch token
  const token=JSON.parse(localStorage.getItem("token")||'')
  //create http header
  let headers=new HttpHeaders()
  //add token to req header
  if(token){
    headers=headers.append('x-access-token',token)
    options.headers=headers
  }
  return options
}




//withdraw logic defined here
withdraw(acno:any,pswd:any,amt:any) {
  const data={
    amt,
    acno,
    pswd
  }
  //api call
 return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

  }

 transaction(acno:any){
  const data={
    acno
  }
  //api call
 return this.http.post('http://localhost:3000/transaction',data,this.getOptions())

 }

 onDelete(acno:any){
   //onDelete API call
   return this.http.delete('http://localhost:3000/onDelete/'+acno,this.getOptions())

 }
 
}
