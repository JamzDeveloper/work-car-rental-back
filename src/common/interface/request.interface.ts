import { Request as ExpressRequest } from 'express';
interface CustomRequest extends ExpressRequest {
  user?: any;
}

export default CustomRequest;
