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
// Template pack-angular:web/src/app/app.module.ts.p.vm
//
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
//import { FileUploadModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { AuthService } from './service/auth.service';
import { MessageService } from './service/message.service';
import { routing } from './app.routes';
import { EmailValidator } from './support/email.validator';
import { ConfirmDeleteDialogComponent } from './support/confirm-delete-dialog.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { ToggleSidebarService } from './sidebar/broadcasters/ham-press-broadcaster.service';

//ng2-bootstrap
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { DataTableModule } from 'ng2-data-table';
import { DatepickerModule } from 'ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { RebirthNGModule } from 'rebirth-ng';

//toaster
import { ToastyModule } from 'ng2-toasty';




// Chain ...
import { ChainModule } from './modules/chain/chain.module';





// User ...
import { UserModule } from './modules/user/user.module';

import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { LoginComponent } from './custom-entities/login/login.component';

import { LoginService } from './custom-entities/login/services/login.service';
import { TransactionComponent } from './custom-entities/transaction/transaction.component';
import { XpoComponent } from './custom-entities/xpo/xpo.component';
import { ServiceProviderComponent } from './custom-entities/service-provider/service-provider.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EmailValidator,
        ConfirmDeleteDialogComponent,
        LoginComponent,
        TransactionComponent,
        XpoComponent,
        ServiceProviderComponent
   
        
    
    ],
  
    imports: [

        //application modules
        
        UserModule,
        // angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,

        // angular material,
        MaterialModule,
        //ng2-bootstrap
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        RebirthNGModule.forRoot(),
        DataTableModule,
        ToastyModule.forRoot(),
        // prime-ng
        FileUploadModule,

        // our application routes
        routing,
        //sidebar
        SidebarModule
    ],
    providers: [
        // our application services
        AuthService,
        MessageService,
        //prime ng services
        ConfirmationService,
        //sidebar
        ToggleSidebarService,
      
        LoginService
    ],
    entryComponents: [ConfirmDeleteDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
