import { Ammo } from "./src/Ammo";
import { Ship } from "./src/Ship";
import { WeaponStock } from "./src/WeaponStock";

// globals
const UPDATE_TIMEFRAME = 30; // milliseconds 

// game controls
// key map object
const keyMap = {
    'ArrowRight': false,
    'ArrowLeft': false,
    [' ']: false
}

// key press 
document.addEventListener('keydown', (event)=>{
    keyMap[event.key] = true; // all the keys other than the keymap will be false
})
// key release
document.addEventListener('keyup', (event)=>{
    keyMap[event.key] = false;
} )

// objects
const ship = new Ship(); // main ship object
// ammo guns
const ammoArtilery = []; // first gun

// weapons stock
const weaponStock = new WeaponStock({
    x: window.innerWidth / 8,
    y: window.innerHeight - 60,
});

// create ammo
const createAmmo = ({x, y})=>{
    ammoArtilery.push(new Ammo({
        x,
        y,
        reduceAmmo: (ammo)=> weaponStock.updateWeaponStock(ammo),
    }));
};

// main update loop 
const updateGame = ()=>{    
    // moving the ship left and right 
    if(keyMap['ArrowRight'] && ship.x < window.innerWidth - 80){
        ship.moveRight();
    }else if(keyMap['ArrowLeft'] && ship.x > 30){
        ship.moveLeft();
    }

    // firing the ammo
    if(keyMap[' ']){
        // Firing mechanism
        ship.fireControl({
            createAmmo,
        });
    }

    // udpating the ammo movement
    ammoArtilery.forEach((ammo)=>{
        ammo.ammoUpdate();
        // ammo removal
        if(ammo.y < 0){
            // removal from dom and the artilery 
            ammo.removeElement();
            ammoArtilery.splice(ammoArtilery.indexOf(ammo), 1);
        }
    });
    
}
// updating game every 20 milliseconds 
setInterval(()=>{
    updateGame();
}, UPDATE_TIMEFRAME);