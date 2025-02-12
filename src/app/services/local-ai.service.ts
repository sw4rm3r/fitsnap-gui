import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocalAiService {
  constructor(private httpClient: HttpClient) {
  }

_generate(body: { model: string, prompt: string, images: string[] }) {
    return this.httpClient.post('https://934f-213-45-167-54.ngrok-free.app/api/generate', body, {
      headers: { "Accept": "application/x-ndjson" },
      responseType: 'text'
    });
  }
}

