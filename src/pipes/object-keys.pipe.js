var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ObjectKeysPipe = /** @class */ (function () {
    function ObjectKeysPipe() {
    }
    ObjectKeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys.sort();
    };
    ObjectKeysPipe = __decorate([
        Pipe({
            name: 'objectKeys'
        })
    ], ObjectKeysPipe);
    return ObjectKeysPipe;
}());
export { ObjectKeysPipe };
//# sourceMappingURL=object-keys.pipe.js.map