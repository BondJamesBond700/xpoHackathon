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
// Template pack-angular:web/src/app/base-entities/entity-list.component.ts.e.vm
//
import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponse } from "../../support/paging";
import { MessageService } from '../../service/message.service';
import { MdDialog } from '@angular/material';
import { ConfirmDeleteDialogComponent } from "../../support/confirm-delete-dialog.component";
import { User } from './user';
import { BaseUserDetailComponent } from './base-user-detail.component';
import { UserService } from '../../entities/user/user.service';

@Component({
    moduleId: module.id,
	templateUrl: 'base-user-list.component.html',
	selector: 'user-list'
})
export class BaseUserListComponent implements OnInit{

    @Input() header = "Users...";

    // When 'sub' is true, it means this list is used as a one-to-many list.
    // It belongs to a parent entity, as a result the addNew operation
    // must prefill the parent entity. The prefill is not done here, instead we
    // emit an event.
    // When 'sub' is false, we display basic search criterias
    @Input() sub : boolean;
    @Output() onAddNewClicked = new EventEmitter();

    userToDelete : User;
	
	//foreign key dependencies

    // basic search criterias (visible if not in 'sub' mode)
    example : User = new User();

    // list is paginated
    currentPage : PageResponse<User> = new PageResponse<User>(0,0,[]);


    constructor(
		public router : Router,
        public userService : UserService,
        public messageService : MessageService,
        public confirmDeleteDialog: MdDialog
    )
 {
    }

    /**
     * When used as a 'sub' component (to display one-to-many list), refreshes the table
     * content when the input changes.
     */
	 
	ngOnInit(){
        this.loadPage({ first: 0, rows: 100, sortField: null, sortOrder: null, filters: null, multiSortMeta: null });
		    }
	
    ngOnChanges(changes: SimpleChanges) {
        this.loadPage({ first: 0, rows: 100, sortField: null, sortOrder: null, filters: null, multiSortMeta: null });
    }

    /**
     * Invoked when user presses the search button.
     */
    search() {
        if (!this.sub) {
            this.loadPage({ first: 0, rows: 100, sortField: null, sortOrder: 1, filters: null, multiSortMeta: null });
        }
    }

    /**
     * Invoked while inititializing component to fetch datatable.
     */
    loadPage(event) {
        this.userService.getPage(this.example, event).
            subscribe(
                pageResponse => this.currentPage = pageResponse,
                error => this.messageService.error('Could not get the results', error)
            );
    }

    onRowSelect(event : any) {
		let id =  event.id;
		this.router.navigate(['/user', id]);
    }

    addNew() {
        if (this.sub) {
            this.onAddNewClicked.emit("addNew");
        } else {
            this.router.navigate(['/user', 'new']);
        }
    }

    showDeleteDialog(rowData : any) {
        let userToDelete : User = <User> rowData;

        let dialogRef = this.confirmDeleteDialog.open(ConfirmDeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.delete(userToDelete);
            }
        });
    }

    private delete(userToDelete : User) {
        let id =  userToDelete.id;

        this.userService.delete(id).
            subscribe(
                response => {
                    this.currentPage.remove(userToDelete);
                    this.messageService.info('Deleted OK', 'RPT Code Gen!');
                },
                error => this.messageService.error('Could not delete!', error)
            );
    }
	   rowSelected(item:User){
        this.router.navigate(['/user-view', item.id]);
    }
}