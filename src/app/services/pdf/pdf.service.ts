import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONSTANTS } from 'src/app/helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private getTextUrl = CONSTANTS.BASE_API_URL + 'pdf/get-text';

  constructor(
    private http: HttpClient
  ) { }

  getText(): Observable<string> {
		return this.http.get<string>(this.getTextUrl);
	}
}
