import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'aquarium',
  templateUrl: 'aquarium.component.html'
})
export class AquariumComponent implements OnInit {
  public profundo: number = 20;
  private proportionChange: any = {
    alto:0,
    largo:0,
    profundo:0
  };
  public alto: number = 20;
  public largo: number = 20;
  public scale: number = 1;
  constructor() {}
  @ViewChild('mainDiv') mainDiv: ElementRef;
  @ViewChild('frontDiv') frontDiv: ElementRef;
  ngOnInit() {

  }
  controlProportion(num, param){
   // this.getProportions();
    switch (param) {
      case "alto":
        if(num > 25) {

          let newScale = 25/num ;
          this.scale > newScale ? this.scale = newScale:'';
          if(this.proportionChange[param] < num){
            this.proportionChange[param] = 25/num;
          }
        }else {
          this.scale =  25/num ;
        }
        break;
      case "largo":
        if(num > 40) {

          let newScale = 40/num ;
          this.scale > newScale ? this.scale = newScale:'';
          if(this.proportionChange[param] < num){
            this.proportionChange[param] = 25/num;
          }
        }
        break;
      case "profundo":
        // code...
        break;

      default:
        // code...
        break;
    }
    if(param === 'alto' && num > 30){

    }

  }
  getProportions() {
    if(this.mainDiv.nativeElement.clientHeight - this.frontDiv.nativeElement.clientHeight < 0) {
      this.scale = this.frontDiv.nativeElement.clientHeight -(this.mainDiv.nativeElement.clientHeight)
      // this.scale = (overflowY*100/window.innerHeight )*2
      console.log(this.scale)
      console.log('*************')
    } else {
      this.scale = 0;
    }

  }
}
