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
// Template pack-angular:web/src/app/modules/entity.module.ts.e.vm
//

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//material module
import { MaterialModule } from '@angular/material';

//prime-ng2
import { FileUploadModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

//ng2 bootstrap
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { DataTableModule } from 'ng2-data-table';
import { DatepickerModule } from 'ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap';


// base  User ...
import { BaseUserListComponent } from '../../base-entities/user/base-user-list.component';
import { BaseUserDetailComponent } from '../../base-entities/user/base-user-detail.component';
import { BaseUserLineComponent } from '../../base-entities/user/base-user-line.component';
import { BaseUserViewComponent } from '../../base-entities/user/base-user-view.component';


//  User ...
import { UserService } from '../../entities/user/user.service';
import { UserListComponent } from '../../entities/user/user-list.component';
import { UserDetailComponent } from '../../entities/user/user-detail.component';
import { UserLineComponent } from '../../entities/user/user-line.component';
import { UserViewComponent } from '../../entities/user/user-view.component';

//one to many relation


@NgModule({
  declarations: [
	 UserListComponent,
     UserDetailComponent,
     UserLineComponent,
	 UserViewComponent,
     BaseUserListComponent,
     BaseUserDetailComponent,
     BaseUserLineComponent,
	 BaseUserViewComponent


    ],
    imports: [
		//material
        MaterialModule,

        //angular
        FormsModule,
        HttpModule,
        RouterModule,
        BrowserModule,

        //ng2 bootstrap
        BsDropdownModule.forRoot(),
        DatepickerModule.forRoot(),
		TimepickerModule.forRoot(),
        DataTableModule,

		//one to many relation
        //prime-ng
        FileUploadModule
		
    ],
	exports: [  
		UserListComponent,
        UserDetailComponent,
        UserLineComponent,
	    UserViewComponent
	],
    providers: [
        UserService,
		ConfirmationService
    ],
})
export class  UserModule {}