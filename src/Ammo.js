import { ElementEntity } from "./ElementEntity";

const AMMO_REDUCTION_RATE = 1;

export class Ammo extends ElementEntity{
    constructor({x, y, reduceAmmo}){
        super({tag: 'div', className:'ammo'});
        // passing the reduce ammo function
        this.reduceAmmo = reduceAmmo;
        this.setX(x);
        this.setY(y);
        this.reduceAmmo(AMMO_REDUCTION_RATE);
    }

    // bullet movement up
    ammoUpdate(){
        this.setY(this.y - this.AMMO_SPEED);
    }
}