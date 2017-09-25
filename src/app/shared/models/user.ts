export interface Roles {
    reader: boolean;
    university?: boolean;
    admin?: boolean;
    biotek?: boolean;
    reagens?: boolean;
}

export class User {
    email: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.roles = { reader: true };
    }
}