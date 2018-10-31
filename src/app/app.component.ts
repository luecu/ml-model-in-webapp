import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private model;

  private probPasta = 0;
  private probMilk = 0;

  private loading: boolean = true;

  constructor() {
    //'https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json'
    //
    tf.loadModel('assets/tfjs_files/model.json')
      .then(model => {
        this.model = model;
        this.loading = false;
      });
  }

  public classify(): void {
    let image: any = document.getElementById("image")
    
    let tensor = tf.fromPixels(image)
                    .resizeNearestNeighbor([256,256])
                    .toFloat()
                       .expandDims();
    
    let pred = this.model.predict(tensor);
    pred.print()

    pred.data().then(it => {
      this.probMilk = it[0]
      this.probPasta = it[1]
    });
  }


  public changeImage(files) {

    let reader = new FileReader()
    reader.onload = function (e: any) {
        let imgHtmlElement: any = document.getElementById('image')
        imgHtmlElement.src = e.target.result; //attr('src', e.target.result);
    }
    reader.readAsDataURL(files[0]);
    
    /*let dataUrl = new FileReader().readAsDataURL(files[0]);
    console.log(dataUrl)
    document.getElementById("image").src = dataUrl;
*/
  }

}
