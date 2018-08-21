var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
var PlantPage = /** @class */ (function () {
    function PlantPage(navParams, navCtrl, _dataService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this._dataService = _dataService;
        this.showImg = false;
        this.velocity = 25 / 10000;
        this.maxEscale = 0.8;
        var url = this.navParams.data.url;
        this.plant = this._dataService.getPlant(url);
    }
    PlantPage.prototype.ngOnInit = function () {
        this.main.nativeElement.focus();
        console.log('plant', this.plant);
    };
    PlantPage.prototype.nextPage = function () {
        this.plant = this._dataService.getPlant(this._dataService.nextPage());
    };
    PlantPage.prototype.prevPage = function () {
        this.plant = this._dataService.getPlant(this._dataService.prevPage());
    };
    PlantPage.prototype.startTouching = function ($event) {
        this.scaleNumber = this.translateNumber = undefined;
        if (!this.starting) {
            this.starting = $event.touches[0].pageX;
        }
    };
    PlantPage.prototype.changeView = function ($event) {
        if (!this.starting) {
            this.starting = $event.touches[0].pageX;
        }
        var diff = (this.starting - $event.touches[0].pageX) * this.velocity;
        var scale = 1 - Math.abs(diff);
        scale = parseFloat(scale.toFixed(4));
        if (scale < this.maxEscale) {
            this.scaleNumber = this.maxEscale;
            this.translateNumber = diff < 0 ? (this.maxEscale - scale) * 100 : (scale - this.maxEscale) * 100;
            this.scale = 'scale(' + Math.abs(this.scaleNumber) + ') translateX(' + this.translateNumber + '%)';
        }
        else {
            this.scaleNumber = Math.abs(scale);
            this.scale = 'scale(' + this.scaleNumber + ')';
        }
    };
    PlantPage.prototype.endTouching = function ($event) {
        var _this = this;
        if (this.scaleNumber) {
            this.main.nativeElement.classList.add('end');
            var changeView_1 = false;
            if (this.scaleNumber > this.maxEscale) {
                this.scaleNumber = 1;
                this.translateNumber = 0;
            }
            else {
                if (this.translateNumber < 0) {
                    this.translateNumber = -120;
                    changeView_1 = true;
                    setTimeout(function () { _this.nextPage(); }, 150);
                }
                else {
                    this.translateNumber = 120;
                    changeView_1 = true;
                    setTimeout(function () { _this.prevPage(); }, 150);
                }
            }
            this.scale = 'scale(' + this.scaleNumber + ') translateX( ' + this.translateNumber + '%)';
            this.starting = undefined;
            setTimeout((function () {
                _this.main.nativeElement.classList.remove('end');
                _this.scale = undefined;
                if (changeView_1) {
                    if (_this.translateNumber < 0) {
                        _this.main.nativeElement.classList.add('from-left');
                    }
                    else {
                        _this.main.nativeElement.classList.add('from-right');
                    }
                    setTimeout(function () {
                        _this.main.nativeElement.classList = [];
                    }, 650);
                }
            }).bind(this), 300);
        }
    };
    __decorate([
        ViewChild('main'),
        __metadata("design:type", ElementRef)
    ], PlantPage.prototype, "main", void 0);
    PlantPage = __decorate([
        Component({
            selector: 'page-plant',
            templateUrl: './plant.page.html'
        }),
        __metadata("design:paramtypes", [NavParams, NavController, DataService])
    ], PlantPage);
    return PlantPage;
}());
export { PlantPage };
//# sourceMappingURL=plant.page.js.map