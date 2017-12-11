import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public fname:any = "";
  public lname:any = "";
  public email:any = "";
  public password:any = "";
  public username:any = "";
  public pwd:any = "";
  public modalTitle:any;
  constructor(private router:Router,private DataService:DataService) { }

  ngOnInit() {
  }
  login() {
    const pointer = this;
    console.log(this.username,this.pwd)
    var params = {
     "emailId":this.username,
     "password": this.pwd
   };

   this.DataService.fetchData(params,"/users/access_token").
   subscribe(
     (data) => {
       if(data.json().code ==0 ){
        pointer.modalTitle = "SUCCESS"
        localStorage.message = data.json().message;
        $("#operationSuccess").modal("show");
        this.router.navigate(['home'])
      }
      else {
        pointer.modalTitle = "ERROR"
        localStorage.message = data.json().message;
        $("#operationSuccess").modal("show");
      }
    },
    function(err){
      pointer.modalTitle = "ERROR";
      localStorage.message = "Internet failure Or Server error occured";
      $("#operationSuccess").modal("show");

    }
    );
 }

 register() {
   $("#registerModal").modal("show");
 }
 createNewUser(){
  console.log(this.fname,this.lname,this.email,this.password);
  var params = {
   "firstName":this.fname,
   "lastName":this.lname,
   "emailId":this.email,
   "password": this.password
 };

 this.DataService.fetchData(params,"/users").
 subscribe(
   (data) => {
     if(data.json().code ==0 ){
       alert("user created successfully");
     }
     else {
      alert(data.json().message);
    }
  },
  function(err){
   alert("some error occured");

 }
 );

}
}
