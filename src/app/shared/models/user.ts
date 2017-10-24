interface Roles {
  reader: boolean;
  admin?: boolean;
  paidCustomer?: boolean;
  paidUser?: boolean;
}

export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles: Roles[] = [];

  constructor(user) {
      this.email = user.email;
      this.uid = user.uid;
      this.roles.push({reader: true});
  }
}