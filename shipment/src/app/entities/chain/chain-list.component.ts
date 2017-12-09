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
import { Chain } from '../../base-entities/chain/chain';
import { ChainDetailComponent } from './chain-detail.component';
import { ChainService } from './chain.service';

import { BaseChainListComponent } from '../../base-entities/chain/base-chain-list.component';


@Component({
    moduleId: module.id,
	templateUrl: 'chain-list.component.html',
	selector: 'chain-list'
})
export class ChainListComponent extends BaseChainListComponent implements OnInit {

    constructor(
		public router : Router,
        public chainService : ChainService,
        public messageService : MessageService,
        public confirmDeleteDialog: MdDialog
    )
    {
        super(
		router,
        chainService,
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