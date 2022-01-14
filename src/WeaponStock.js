import { ElementEntity } from "./ElementEntity";

export class WeaponStock extends ElementEntity{
    constructor({x, y}){
        super({tag:'div', className:'weapon-stock'});

        // setting weapon stock dimensions
        this.setX(x);
        this.setY(y);
        this.refreshElement();

    }
    // updating the weapon stock
    updateWeaponStock(ammo){
        if(this.INITIAL_AMMO > 1){
            this.INITIAL_AMMO -= ammo;
            this.refreshElement();
        }else{
            this.reloadAmmo();
        }
        
    }
    //reload warning
    reloadAmmo(){
        this.element.innerText = 'RELOAD: REQUIRED';
    }

    // refreshes the score and replaces the score element
    refreshElement(){
        this.element.innerText = `AMMO LEFT: ${this.INITIAL_AMMO}`;
    }

}