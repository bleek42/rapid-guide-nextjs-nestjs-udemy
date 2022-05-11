import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface ReqestUser extends Request {
  user?: User;
}
