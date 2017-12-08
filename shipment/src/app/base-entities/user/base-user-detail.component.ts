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
// Template pack-angular:web/src/app/base-entities/entity-detail.component.ts.e.vm
//
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService} from '../../service/message.service';
import {User} from './user';
import {UserService} from '../../entities/user/user.service';

@Component({
    moduleId: module.id,
	templateUrl: 'base-user-detail.component.html',
	providers: [DatePipe],
	selector: 'user-detail',
})
export class BaseUserDetailComponent implements OnInit, OnDestroy {
    user : User;


    private params_subscription: any;
	private edit:boolean;


    @Input() sub : boolean = false;
    @Output() onSaveClicked = new EventEmitter<User>();
    @Output() onCancelClicked = new EventEmitter();

	public dt: Date = new Date();
	private showDatepicker: boolean = false;
	private value = "02-09-2015";
	
    constructor(public route: ActivatedRoute, public router: Router, public messageService: MessageService, public userService: UserService
    ) {
    }

    ngOnInit() {
        if (this.sub) {
            return;
        }
    
        this.params_subscription = this.route.params.subscribe(params => {
            let id = params['id'];
            console.log('ngOnInit for user-detail ' + id);

            if (id === 'new') {
				this.edit = false;
                this.user = new User();
            } else {
				this.edit = true;
                this.userService.getUser(id)
                    .subscribe(user => {
                            this.user = user;
                        },
                        error =>  this.messageService.error('ngOnInit error', error)
                    );
            }
        });
    }

    ngOnDestroy() {
        if (!this.sub) {
            this.params_subscription.unsubscribe();
        }
    }

    onSave() {
        this.userService.update(this.user).
            subscribe(
                user => {
                    this.user = user;
                    if (this.sub) {
                        this.onSaveClicked.emit(this.user);
                        this.messageService.info('Saved OK and msg emitted', 'RPT Code Gen')
                    } else {
                        this.messageService.info('Saved OK', 'RPT Code Gen')
                    }
                },
                error =>  this.messageService.error('Could not save', error)
            );
    }

    onCancel() {
        if (this.sub) {
            this.onCancelClicked.emit("cancel");
            this.messageService.info('Cancel clicked and msg emitted', 'RPT Code Gen')
        }
    }


                                /**
        * ng2 bootstrap datepicker functions
        * TODO: pick date from frontend and set it in modal
        */
        private transformDate(date:Date):string {
            var d = new DatePipe('pt-PT').transform(date, 'yyyy/MM/dd');
            return d;
        }

        today(): void {
            this.dt = new Date();
            this.apply();
            this.close();
        }
        clear(): void {
            this.dt = this.value = void 0;
            this.close();
        }

        private apply(): void {       
            this.value = this.transformDate(this.dt);
            this.user.birthDate = this.dt;	
        }

        open() {
            this.showDatepicker = true;
        }
        close() {
            this.showDatepicker = false;
        }
        
        onSelectionDone(event) {
            this.dt = event;
            this.apply();
            this.close();
        }
        onClickedOutside(event) {
            console.log("onClickedOutside", event);
            if (this.showDatepicker) this.close();
        }
        
        ngAfterViewInit() {
            this.dt = new Date(this.value);
        }
		
}
