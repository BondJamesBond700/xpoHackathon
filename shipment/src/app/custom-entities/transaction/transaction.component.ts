import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { LoginService } from './../login/services/login.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public userSubscription:Subscription;
  public loggedInUser;
  public photo;
  public userName;
  constructor(private login: LoginService,private router:Router ) { }

  ngOnInit() {
    this.userSubscription=this.login.loggedInUserStream$.subscribe((user)=>{
      this.loggedInUser = user;
      if (this.loggedInUser == null || this.loggedInUser === undefined) {
        console.log('User not logged in , going to login screen! ');
        this.router.navigate(['/login']);
      } else {
        this.photo = this.getLoggedInUserPhotoUrl(this.loggedInUser['name']);
        this.userName = this.loggedInUser['name'];
        console.log(this.userName)
      }



    })

  }

  getLoggedInUserPhotoUrl(user)
  {
    if(user=='xpo')
    {
      return '../../assets/images/producer.jpg'

    }
    if(user=='serviceprovider')
      {
        return '../../assets/images/consumer.jpg'
      }
    


  }


 

}
