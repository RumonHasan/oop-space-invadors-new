import { ElementEntity } from "./ElementEntity";
import alienImage from './images/alien.png';

export class Alien extends ElementEntity{
    constructor({x, y, 
    removeAlien,
    removeAmmo,
    getAmmoContact}){
        super({tag:'img', className:'alien'});
        this.element.src = alienImage;

        // settting the alien
        this.setX(x);
        this.setY(y);
        // alien movement speed
        this.ALIEN_SPEED = 3;

        // default direction
        this.alienDirection = 'left';

        // alien contact
        this.removeAlien = removeAlien;
        this.removeAmmo = removeAmmo;
        this.getAmmoContact = getAmmoContact;

    }

    // udpate the alien movement
    moveLeft(){
        this.alienDirection = 'left';
    }
    moveRight(){
        this.alienDirection = 'right';
    }   
    // updating alien movements based on direction
    updateAlienMovement(){
        if(this.alienDirection === 'left'){
            this.setX(this.x - this.ALIEN_SPEED);
        }else{
            this.setX(this.x + this.ALIEN_SPEED);
        }

        // passes the alien and checks for overlapping bullet
        const ammoContactBullet = this.getAmmoContact(this); 
        if(ammoContactBullet){
            this.removeAlien(this);
        }

    }
}