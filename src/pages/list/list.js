var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { PlantPage } from '../plant/plant.page';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, _dataService) {
        this.navCtrl = navCtrl;
        this._dataService = _dataService;
        this.active = 0;
        this.userScroll = false;
        this.families = this._dataService.getAllFamilies();
    }
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.prototype.itemTapped = function (event, url, letter, index) {
        this._dataService.setPage(url, letter, index);
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(PlantPage, { url: url }, { animate: true, animation: "transition" });
    };
    ListPage.prototype.familyInView = function ($event) {
        var allboxes = document.getElementsByClassName('family-box');
        for (var i = 0; i < allboxes.length; i++) {
            var family = allboxes[i].getBoundingClientRect();
            if (family.height + family.top > 60) {
                if (this.userScroll) {
                    this.active = i;
                }
                break;
            }
        }
    };
    ListPage.prototype.goTo = function (familyList) {
        this.userScroll = false;
        this.active = familyList;
        var allboxes = document.getElementsByClassName('family-box');
        allboxes[familyList].scrollIntoView({
            block: "start",
            behavior: 'smooth'
        });
    };
    ListPage.prototype.onDrag = function ($event) {
        var elementToActive = document.elementFromPoint($event.touches[0].pageX, $event.touches[0].pageY);
        if (elementToActive.parentElement.parentElement.parentElement.getAttribute('id') === 'letter-list') {
            var goToSection = Number(elementToActive.classList[0]);
            if (this.active !== goToSection) {
                this.active = goToSection;
                this.goTo(this.active);
            }
        }
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, DataService])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map