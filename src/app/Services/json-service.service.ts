import { Injectable } from '@angular/core';
import { File } from '../Class/File';
@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {
  constructor() { }
  generateImageDataArray(): File[] {
    const  jsonData: File[] = [];
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 1; i <= 4000; i++) {
      const image: File = {
        id:i,
        photo: `url_to_photo_${i}`,
        author: `image_author_${i}`,
        text: () => this.generateRandomString(100)
      };
      jsonData.push(image);
    }    return jsonData ;
  }

  generateRandomString(length: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      resolve(result);
    });
  }
}
