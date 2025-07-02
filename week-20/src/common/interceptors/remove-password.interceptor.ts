import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  // TODO: Implement the intercept method to remove password field from response
  // The interceptor should work for both single objects and arrays

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Your implementation here
    // Hint: Use rxjs operators like map to transform the response

    return next.handle();
  }
}
