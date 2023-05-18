import {HttpHeaders} from "@angular/common/http";

export class BaseService {
  protected readonly apiUrl: string = 'http://localhost:3000';

  protected readonly httpHeaders: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );
}
