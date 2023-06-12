import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GlobalService {

   async encryptPassword(userPass: string) {
      console.log('Incomming password fot ENC!:::===>', userPass);
      return bcrypt.hash(userPass, 10);
   }
}
