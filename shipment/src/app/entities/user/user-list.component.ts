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
// Template pack-angular:web/src/app/entities/entity-list.component.ts.e.vm
//
import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponse } from "../../support/paging";
import { MessageService } from '../../service/message.service';
import { MdDialog } from '@angular/material';
import { ConfirmDeleteDialogComponent } from "../../support/confirm-delete-dialog.component";
import { User } from '../../base-entities/user/user';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from './user.service';

import { BaseUserListComponent } from '../../base-entities/user/base-user-list.component';


@Component({
    moduleId: module.id,
	templateUrl: 'user-list.component.html',
	selector: 'user-list'
})
export class UserListComponent extends BaseUserListComponent implements OnInit {

    constructor(
		public router : Router,
        public userService : UserService,
        public messageService : MessageService,
        public confirmDeleteDialog: MdDialog
    )
    {
        super(
		router,
        userService,
        messageService,
        confirmDeleteDialog);
    }
	 
	ngOnInit(){
        super.ngOnInit();
    }
	
    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }
}