import { Request as ExpressRequest } from 'express';
interface CustomRequest extends ExpressRequest {
  user?: UserGoogle;
}

export default CustomRequest;
