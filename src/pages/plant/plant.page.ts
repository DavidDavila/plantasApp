import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'page-plant',
  templateUrl: './plant.page.html'
})
export class PlantPage implements OnInit {
  public plant:any;
  private starting: any;
  public scale: string;
  public scaleNumber: number;
  public translateNumber: number;
  public showImg: boolean = false;
  private velocity = 25 / 10000;
  private maxEscale = 0.8;
  @ViewChild('main') main: ElementRef;
  constructor(public navParams: NavParams, public navCtrl: NavController,private _dataService:DataService) {
    let url = this.navParams.data.url;
    this.plant = this._dataService.getPlant(url);
  }

  ngOnInit() {
    this.main.nativeElement.focus();
    console.log('plant', this.plant);
  }
  nextPage(){
    this.plant = this._dataService.getPlant( this._dataService.nextPage() );
  }
  prevPage(){
    this.plant = this._dataService.getPlant( this._dataService.prevPage() );
  }
  startTouching($event){
    this.scaleNumber = this.translateNumber =  undefined;
    if(!this.starting){
      this.starting = $event.touches[0].pageX;
    }
  }
  changeView($event){
    if(!this.starting){
      this.starting = $event.touches[0].pageX;
    }
    let diff = (this.starting - $event.touches[0].pageX ) * this.velocity;
    let scale = 1 - Math.abs(diff);
    scale = parseFloat(scale.toFixed(4));
    if( scale < this.maxEscale){
      this.scaleNumber =  this.maxEscale;
      this.translateNumber =  diff < 0? ( this.maxEscale - scale   ) * 100 : ( scale - this.maxEscale ) * 100
      this.scale =  'scale(' + Math.abs(this.scaleNumber) + ') translateX(' + this.translateNumber + '%)';
    } else {
      this.scaleNumber = Math.abs(scale)
      this.scale =  'scale('+ this.scaleNumber + ')';
    }

  }
  endTouching($event) {
    if(this.scaleNumber ){
      this.main.nativeElement.classList.add('end');
      let changeView = false;
      if(this.scaleNumber>this.maxEscale){
        this.scaleNumber = 1;
        this.translateNumber = 0;
      }else{
        if(this.translateNumber < 0 ){
          this.translateNumber = -120;
          changeView = true;
          setTimeout(()=>{this.nextPage()},150);
        } else {
          this.translateNumber = 120;
          changeView = true;
          setTimeout(()=>{this.prevPage()},150);

        }
      }
      this.scale =  'scale('+ this.scaleNumber + ') translateX( '+ this.translateNumber +'%)';
      this.starting = undefined;
      setTimeout( (()=>{
          this.main.nativeElement.classList.remove('end');
          this.scale = undefined;
          if(changeView){
            if(this.translateNumber < 0){
              this.main.nativeElement.classList.add('from-left');
            } else{
              this.main.nativeElement.classList.add('from-right');

            }
            setTimeout(()=>{
              this.main.nativeElement.classList = [];
            },650)
          }
      }).bind(this),300)
    }
  }

}
