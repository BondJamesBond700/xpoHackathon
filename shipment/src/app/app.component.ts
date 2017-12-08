//
// Copyright © 2016-2017 Infosys Limited, Bangalore, India. All Rights Reserved.
// * Except for any open source software components embedded in this
// * Infosys proprietary software program (Program), this Program is protected
// * by copyright laws, international treaties and other pending or existing
// * intellectual property rights in India, the United States and other countries.
// * Except as expressly permitted, any unauthorized reproduction, storage,
// * transmission in any form or by any means (including without limitation
// * electronic, mechanical, printing, photocopying, recording or otherwise),
// * or any distribution of this Program, or any portion of it,
// * may result in severe civil and criminal penalties, and
// * will be prosecuted to the maximum extent possible under the law.
// Template pack-angular:web/src/app/app.component.ts.p.vm
//
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './service/auth.service';
import { MessageService } from './service/message.service';
import { ToggleSidebarService } from './sidebar/broadcasters/ham-press-broadcaster.service';
import { LoginService } from './custom-entities/login/services/login.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * The Root component.
 * Defines the main layout and handles user login in a dialog.
 */
@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    public bodyMinusSidebarStyles: any = {};
    public items: any[] = [{ label: 'hello' }];
    msgs: any[] = [];
    menuItems: any[] = [];
    sidebarRequired: boolean = false;

    displayLoginDialog: boolean = false;
    loginFailed: boolean = false;
    authenticated: boolean = false;
    isLoggedIn: boolean = false;
    userSubscription: Subscription;
    loggedInUser: any;
    displayName: any;


    constructor(private authService: AuthService, private tss: ToggleSidebarService, private messageService: MessageService, private loginService: LoginService, private router: Router) {
        messageService.messageSource$.subscribe(
            msg => {
                this.msgs.push(msg);
            });
    }

    ngOnInit() {
        this.userSubscription = this.loginService.loggedInUserStream$.subscribe((user) => {
            console.log('user is', user);
            this.loggedInUser = user;
            if (this.loggedInUser != null && this.loggedInUser != undefined) {
                this.isLoggedIn = true;
                this.displayName = user['name'];
                /*this.loggedInUser['firstName'] + " " + this.loggedInUser['middleName'] + "" + this.loggedInUser['lastName'];*/
                //  console.log('displayname 1', this.displayName);
                //  console.log('displayname 2', this.loggedInUser['displayName']);
            } else {
                this.isLoggedIn = false;
            }
        },
            (err) => {
                this.isLoggedIn = false;
                this.router.navigate(['/login']);
                let error = JSON.parse(err._body);
                this.messageService.error('Error while getting user details', error);
                console.log(err);
            });
        this.items = [
            { label: 'Home', routerLink: ['/'], icon: 'fa-home' },

        ]

    }
    login() {
        this.router.navigate(['/login']);
    }
    logout() {
        // this.loader.startLoading();
        if (this.isLoggedIn) {
            this.isLoggedIn = false;
        }
        this.loginService.userDetails(null);
        // this.loader.stopLoading();
        this.router.navigate(['/login']);
    }

    // sample method from angular doc
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `Status: ${error.status} - Text: ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    onChangeSidebarWidth(sidebarState) {
        if (this.sidebarRequired && sidebarState == "expanded") {
            this.bodyMinusSidebarStyles["marginLeft"] = "200px";
        } else if (this.sidebarRequired && sidebarState == "collapsed") {
            this.bodyMinusSidebarStyles["marginLeft"] = "50px";
        } else {
            this.bodyMinusSidebarStyles["marginLeft"] = "0px";
        }
    }
    onClickHamButton(event) {
        this.tss.toggleSidebarAnnouncement();
    }
}
