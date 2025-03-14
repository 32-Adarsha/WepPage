import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three-stdlib';

import { LoadingManager } from 'three';
@Injectable({
  providedIn: 'root'
})
export class GtlfloaderService {


  private loader: GLTFLoader;


  constructor() {
    const loadingManager = new LoadingManager();
    this.loader = new GLTFLoader(loadingManager);
  }

  async loadModel(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      );
    });
  }

}
