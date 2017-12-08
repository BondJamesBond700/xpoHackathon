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
// Template pack-angular:web/src/app/service/message.service.ts.p.vm
//
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class MessageService {
    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    private messageSource = new Subject<any>();

    messageSource$ = this.messageSource.asObservable();

    info(summary: string, detail: string) {
        //this.messageSource.next({ severity: 'info', summary: summary, detail: detail });

        var toastOptions: ToastOptions = {
            title: summary,
            msg: detail,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        this.toastyService.success(toastOptions);
    }

    error(summary: string, detail: string) {
        // this.messageSource.next({ severity: 'error', summary: summary, detail: detail });
        // console.log("ERROR: " + summary + " DETAIL: " + detail);
        var toastOptions: ToastOptions = {
            title: summary,
            msg: detail,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        this.toastyService.error(toastOptions);
    }
}