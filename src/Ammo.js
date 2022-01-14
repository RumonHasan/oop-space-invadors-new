import { ElementEntity } from "./ElementEntity";

export class Ammo extends ElementEntity{
    constructor({x, y}){
        super({tag: 'div', className:'ammo'});

        this.setX(x);
        this.setY(y); 
    }

    // bullet movement up
    ammoUpdate(){
        this.setY(this.y - this.AMMO_SPEED);
    }
}