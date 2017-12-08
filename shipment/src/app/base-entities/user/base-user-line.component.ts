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
// Template pack-angular:web/src/app/base-entities/entity-line.component.ts.e.vm
//
import {Component, Input} from '@angular/core';
import {User} from './user';

@Component({
	template: `
        {{ user?.userName }} {{ user?.firstName }} {{ user?.lastName }} 	`,
	selector: 'user-line',
})
export class BaseUserLineComponent {
    @Input() user : User;
}
