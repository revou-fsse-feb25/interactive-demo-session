import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RemovePasswordInterceptor } from "./common/interceptors/remove-password.interceptor";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    // Register the interceptor globally
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply middleware to all routes
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
