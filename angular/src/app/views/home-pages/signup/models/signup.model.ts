import { environment } from '../../../../../environments/environment';

export class signUp {
  _id?: string;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirm_password: string = '';
  gender: string = 'male';
  dob: Date = new Date();
  status: number = 1;
  role: string = environment.role.adminRole;
}
