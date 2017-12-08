import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { MessageService } from '../../service/message.service';
import { User } from '../../base-entities/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Object = {
    userName: '',
    password: ''
  }

  
  

  id : number;
    userName : string;
    password : string;
    firstName : string;
    middleName : string;
    lastName : string;
    email : string;
    birthDate : Date;
    role : string;

  public isSelected: any;
  public entity: any;
  constructor(private auth: AuthService, private loginService: LoginService,
    private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }
  login(loginDetails) {


    if ((loginDetails.username == 'xpo' && loginDetails.password == 'xpo') || (loginDetails.username == 'serviceprovider' && loginDetails.password == 'serviceprovider')) {
      console.log(loginDetails.username + '  ' + loginDetails.password);
      this.loginService.userDetails(loginDetails.username);
      this.router.navigate(['/transaction']);


    }

    else {
      this.messageService.error('Invalid Credentials', 'error');
    }









    /*this.auth.login(loginDetails.userName,loginDetails.password).subscribe(data=>{
      console.log("Response from server:"+data);
    })*/
    // if (this.entity == 'producer') {
    //   this.loginService.authenticateUser(loginDetails).subscribe(data => {
    //     console.log("Response from server:" + JSON.stringify(data));
    //     this.loginService.userDetails(JSON.stringify(data));
    //     if (this.entity == data.role) {
    //       this.router.navigate(['/transaction']);
    //     } else
    //       error => this.messageService.error('Invalid Credentials', '');
    //   },
    //     error => this.messageService.error('Invalid Credentials', error));


    // }

    // if (this.entity == 'consumer') {
    //   this.loginService.authenticateUser(loginDetails).subscribe(data => {
    //     console.log("Response from server:" + JSON.stringify(data));
    //     this.loginService.userDetails(JSON.stringify(data));
    //     if (this.entity == data.role) {
    //       this.router.navigate(['/transaction']);
    //     }
    //     else
    //       error => this.messageService.error('Invalid Credentials', '');

    //   },
    //     error => this.messageService.error('Invalid Credentials', error));

    // }
    // else
    //   this.messageService.error('Invalid Credentials', "");


    //     if(loginDetails.userName=="consumer" || loginDetails.userName=="producer"){
    //   this.loginService.userDetails(JSON.stringify(loginDetails));
    //  this.router.navigate(['/transaction']);

    //     }else{
    //      this.messageService.error('Invalid Credentials', 'error');
    //     }
  }

  // onRoleSelect(role) {
  //   if (this.entity == role) {
  //     this.isSelected = !this.isSelected;
  //   }
  //   else {
  //     this.isSelected = true;
  //     this.entity = role;
  //   }
  // }




}
