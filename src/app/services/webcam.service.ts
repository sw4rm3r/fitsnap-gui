import { Injectable } from '@angular/core';
import {filter, from, map, mergeMap, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import {BarcodeFormat, BrowserCodeReader, DecodeHintType, MultiFormatReader} from '@zxing/library';
import {LocalAiService} from './local-ai.service';

@Injectable()
export class WebcamService {

  showWebcam: boolean = false;
  barcode: string | undefined;
  chat: string | undefined;
  constructor(private localAi: LocalAiService) { }

  _toggleWebcam(){
    this.showWebcam = !this.showWebcam;
  }

  _imageCapture($event: WebcamImage, isManual?: boolean) {
    console.log($event);
    if (isManual) {
      this.chat = '';
      this.localAi._generate({model: 'llava:13b', prompt: 'Cosa vedi in questa immagine?', images: [$event.imageAsBase64]}).pipe(
        // Dividi il testo in righe
        mergeMap((response: any) => {
          const lines: string[] = response.split('\n');
          return from(lines); // Converti l'array in un Observable
        }),
        // Ignora righe vuote (es. newline finali)
        filter(line => line.trim() !== ''),
        // Parsa ogni riga come JSON
        map(line => {
          try {
            return JSON.parse(line);
          } catch (error) {
            console.error('Errore nel parsing:', error);
            return null;
          }
        }),
        // Filtra eventuali errori di parsing
        filter(data => data !== null)
      ).subscribe(
        data => {
          console.log('Dato ricevuto:', data);
          this.chat += data.response;
        },
        error => console.error('Errore nella richiesta:', error)
      )
    } else {
      this.scanBarcode($event.imageAsDataUrl).then((barcode) => {
        if (barcode) {
          this.barcode = barcode;
        }
      });
    }
  }

  async scanBarcode(base64Image: string) {
    const reader = new MultiFormatReader();
    // 1. Configura i formati dei codici a barre da rilevare (opzionale)
    const hints = new Map<DecodeHintType, any>();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128]);
    reader.setHints(hints);
    // 2. Crea l'istanza di BrowserCodeReader
    const codeReader = new BrowserCodeReader(reader);

    // 3. Converti base64 a Blob/URL
    const base64Data = base64Image.split(',')[1] || base64Image;
    const blob = this.base64ToBlob(base64Data, 'image/png');
    const imageUrl = URL.createObjectURL(blob);

    try {
      const result = await codeReader.decodeFromImageUrl(imageUrl);
      console.log('Barcode trovato:', result.getText());
      return result.getText();
    } catch (error) {
      console.info('Cerco barcode... Nessun barcode rilevato.');
      return null;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  }
}
