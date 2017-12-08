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
// Template pack-angular:web/src/app/base-entities/entity.ts.e.vm
//

export class User {
    // Raw attributes
    id : number;
    userName : string;
    password : string;
    firstName : string;
    middleName : string;
    lastName : string;
    email : string;
    birthDate : Date;
    role : string;


    constructor(json? : any) {
        if (json != null) {
            this.id = json.id;
            this.userName = json.userName;
            this.password = json.password;
            this.firstName = json.firstName;
            this.middleName = json.middleName;
            this.lastName = json.lastName;
            this.email = json.email;
            if (json.birthDate != null) {
                this.birthDate = new Date(json.birthDate);
            }
            this.role = json.role;
        }
    }

    // Utils

    static toArray(jsons : any[]) : User[] {
        let users : User[] = [];
        if (jsons != null) {
            for (let json of jsons) {
                users.push(new User(json));
            }
        }
        return users;
    }
}
