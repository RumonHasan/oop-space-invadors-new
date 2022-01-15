import { Alien } from "./src/Alien";
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
// alien array
const ALIEN_ROW = 4;
const ALIEN_COL = 4;
const alienArmy =[];

// removal of ammo and alien upon contact from dom and array
const removeAlien = (alien)=>{
    alienArmy.splice(alienArmy.indexOf(alien), 1);
    alien.removeElement();
}
const removeAmmo = (ammo)=>{
    ammoArtilery.splice(ammoArtilery.indexOf(ammo), 1);
    ammo.removeElement();
};

// return the bullet and ammo DOM elem => that made contact
const getAmmoContact = (alien)=>{
    ammoArtilery.forEach((ammo)=>{
        if(isAmmoContact(alien, ammo)){
            console.log(ammo);
        }
    });
    return null;
}

// spawning the alien matrix
for(let row = 0; row < ALIEN_ROW; row++){
    for( let col = 0; col < ALIEN_COL; col++){
        const newAlien = new Alien({
            x: col * 60 + 30,
            y: row * 60 + 30,
            removeAlien,
            removeAmmo,
            getAmmoContact,
        })
        // updating the alien army
        alienArmy.push(newAlien);
    }
};

// returning true or false on contact
const isAmmoContact = (alien, ammo)=>{
    const rect1 = alien.element.getBoundingClientRect();
    const rect2 = ammo.element.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
};



// gets the first top left element
const getLeftTopAlien = ()=>{
    return alienArmy.reduce((alien, currentAlien)=> 
    currentAlien.x >= alien.x ? alien : currentAlien);
}
// gets the right first element
const getRightTopAlien = ()=>{
    return alienArmy.reduce((alien,currentAlien)=>
        currentAlien.x > alien.x ? currentAlien : alien
    )
}

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

    // updating the alien movement
    alienArmy.forEach((alien)=>{
        alien.updateAlienMovement();
    })
    // left border
    const leftTopAlien = getLeftTopAlien();
    if(leftTopAlien.x < 30){
        alienArmy.forEach((alien)=>{
            alien.moveRight();
        })
    }
    // right border
    const rightTopAlien = getRightTopAlien();
    if(rightTopAlien.x > window.innerWidth - 30){
        alienArmy.forEach((alien)=>{
            alien.moveLeft();
        })
    }
}
// updating game every 20 milliseconds 
setInterval(()=>{
    updateGame();
}, UPDATE_TIMEFRAME);