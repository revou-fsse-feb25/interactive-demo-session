import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  // TODO: Implement the middleware to log request method, path, and timestamp

  use(req: Request, res: Response, next: NextFunction) {
    // Your implementation here
    // Hint: Use console.log to output the required information

    next();
  }
}
