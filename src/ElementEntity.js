// Contains the basic principle functions and element creation function
export class ElementEntity{
    constructor({tag='div', className=''} = {}){
        this.element = document.createElement(tag);
        this.element.className= 'entity ' + className;
        document.body.appendChild(this.element);

        // speeds
        this.SHIP_SPEED = 3;
        this.AMMO_SPEED = 5;
        // initial ammo
        this.INITIAL_AMMO = 10;

    }
    // setting the positions of the elment on the screen
    setX(x){
        this.x = x;
        this.element.style.left = `${this.x}px`;
    }
    setY(y){
        this.y = y;
        this.element.style.top = `${this.y}px`;
    }
    // removing the element after it is done
    removeElement(){
        this.element.remove();
        this.element = null;
    }
    
}