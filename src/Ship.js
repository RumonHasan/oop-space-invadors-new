import { ElementEntity } from "./ElementEntity";

const HEIGHT_PIXEL_DEF = 70;

export class Ship extends ElementEntity{
    constructor(){
        super({tag:'div', className:'ship'});

        // fire ability boolean
        this.fireAbility = true;
        this.SHIP_WIDTH = 40;

        // setting ship position on screen
        this.setX(window.innerWidth / 2);
        this.setY(window.innerHeight - HEIGHT_PIXEL_DEF);


    }

    // enabling the ship to move left and right
    moveRight(){
        this.setX(this.x + this.SHIP_SPEED);
    }
    moveLeft(){
        this.setX(this.x - this.SHIP_SPEED);
    }

    // fire control
    fireControl({createAmmo}){
        if(this.fireAbility){
            this.fireAbility = false;
            createAmmo({
                x: this.x + this.SHIP_WIDTH / 2,
                y: this.y,
            });
            setTimeout(()=> {this.fireAbility = true}, 1000);
        }
        
    }

   
}