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
// Template pack-angular:web/src/app/entities/entity-detail.component.ts.e.vm
//
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService} from '../../service/message.service';
import {User} from '../../base-entities/user/user';
import {UserService} from './user.service';

import { BaseUserDetailComponent } from '../../base-entities/user/base-user-detail.component';


@Component({
    moduleId: module.id,
	templateUrl: 'user-detail.component.html',
	providers: [DatePipe],
	selector: 'user-detail',
})
export class UserDetailComponent extends BaseUserDetailComponent implements OnInit, OnDestroy {
    
    constructor(public route: ActivatedRoute, public router: Router, public messageService: MessageService, public userService: UserService
    ){
        super(route, router, messageService, userService
                );
    }

    ngOnInit(){
        super.ngOnInit();
    }
}
