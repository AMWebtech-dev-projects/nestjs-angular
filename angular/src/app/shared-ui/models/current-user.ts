import { environment } from '../../../environments/environment';

export class currentUser {
  _id?: string;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirm_password: string = '';
  gender: string = 'male';
  profileImage?: any = '';
  profileOldImage?: any = '';
  dob: Date = new Date();
  status: number = 1;
  role: string = environment.role.userRole;
}
