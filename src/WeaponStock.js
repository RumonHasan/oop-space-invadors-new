import { ElementEntity } from "./ElementEntity";

export class WeaponStock extends ElementEntity{
    constructor({x, y}){
        super({tag:'div', className:'weapon-stock'});
        this.element.innerHTML += this.AMMO_LOADED;
     
        // setting weapon stock dimensions
        this.setX(x);
        this.setY(y);
    }

}