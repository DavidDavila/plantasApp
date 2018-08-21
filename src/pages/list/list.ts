import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataService} from '../../services/data.service';
import { PlantPage } from '../plant/plant.page';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{
  selectedItem: any;
  public active = 0;
  public userScroll: boolean = false;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  public families: any;
  constructor(public navCtrl: NavController, private _dataService:DataService) {
    this.families = this._dataService.getAllFamilies();
  }
  ngOnInit(){

  }

  itemTapped(event, url, letter, index) {
    this._dataService.setPage(url, letter, index);
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PlantPage, { url: url},{animate: true, animation: "transition"});
  }
  familyInView($event){

    let allboxes = document.getElementsByClassName('family-box');
    for (let i = 0; i < allboxes.length; i++) {
      let family = allboxes[i].getBoundingClientRect();
      if(family.height + family.top > 60){
        if(this.userScroll){
          this.active = i;
        }
        break;
      }
    }
  }
  goTo(familyList){
    this.userScroll = false;
    this.active = familyList
    let allboxes = document.getElementsByClassName('family-box');
    allboxes[familyList].scrollIntoView({
      block:    "start",
      behavior: 'smooth'
    })
  }
  onDrag($event){

    let elementToActive = document.elementFromPoint($event.touches[0].pageX, $event.touches[0].pageY);
    if(elementToActive.parentElement.parentElement.parentElement.getAttribute('id') === 'letter-list'){
      let goToSection= Number(elementToActive.classList[0]);
      if(this.active !== goToSection){
        this.active = goToSection;
        this.goTo(this.active);
      }
    }
  }
}
