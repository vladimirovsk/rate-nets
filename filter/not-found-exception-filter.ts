import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException
} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.NOT_FOUND);
    response.json({
      status: HttpStatus.NOT_FOUND,
      message: 'Route not found'
    });
  }
}