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
// Template pack-angular:web/src/app/base-entities/entity-view.component.ts.e.vm
//
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService} from '../../service/message.service';
import {User} from './user';
import {UserService} from '../../entities/user/user.service';

@Component({
    moduleId: module.id,
	templateUrl: 'base-user-view.component.html',
	providers: [DatePipe],
	selector: 'user-view',
})
export class BaseUserViewComponent implements OnInit {
    user : User;


    private params_subscription: any;
	private edit:boolean;


    @Input() sub : boolean = false;
    @Output() onSaveClicked = new EventEmitter<User>();
    @Output() onCancelClicked = new EventEmitter();



    constructor(public route: ActivatedRoute, 
    public router: Router, 
    public messageService: MessageService, 
    public userService: UserService
    ) {
    }

    ngOnInit() {
        if (this.sub) {
            return;
        }
        this.params_subscription = this.route.params.subscribe(params => {
            let id = params['id'];
            console.log('ngOnInit for user-detail ' + id);
			this.edit = true;
                this.userService.getUser(id)
                    .subscribe(user => {
                            this.user = user;
                        },
                        error =>  this.messageService.error('ngOnInit error', error)
                    );
            
        });
    }
}
