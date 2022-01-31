import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(response => ({
        meta: {
          page: response.pagination?.page + 1 || 1,
          pageSize: response.pagination?.pageSize || null,
          offset: response.pagination?.offset || null,
          count: response.data?.length || response.length || 0,
          totalResults: response.pagination?.totalResults || null,
          totalPages:
            Math.floor(
              response.pagination?.totalResults / response.pagination?.pageSize,
            ) || null,
          hasNextPage: response.pagination?.hasNextPage || false,
        },
        records: response.data || response,
      })),
    );
  }
}
