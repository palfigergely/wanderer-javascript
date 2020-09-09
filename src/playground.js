'use strict'
import { pict } from './graphic';
import { ctx } from './index';
import { enemy, Character } from './Character';
import { hero } from './game';


// Set-up the playground
let sizex = 10;
let sizey = sizex;
let width = 720;
let height = width;
let stepLengthx = Math.floor(width / sizex);
let stepLengthy = Math.floor(height / sizey);

export let sizes = {
    sizex: sizex,
    sizey: sizey,
    width: width,
    height: height,
    stepLengthx: stepLengthx,
    stepLengthy: stepLengthy
};

export let map = [];
    for(let i = 0; i<sizex; i++){
        map.push([]);
        for(let j = 0; j<sizey; j++){
            map[i].push(0);
        }
    }

export function drawMap(gamelevel){
    map = [];
    for(let i = 0; i<sizex; i++){
        map.push([]);
        for(let j = 0; j<sizey; j++){
            map[i].push(0);
        }
    }
    let wallxcord = [3,3,3,2,1,5,5,5,5,6,7,8,7,8,7,8,0,1,2,3,1,1,3,3,5,6,5,6,8,8,8,1,2,3,3,5,6];
    let wallycord = [0,1,2,2,2,1,2,3,4,4,4,4,1,1,2,2,4,4,4,4,5,6,5,6,6,6,7,7,6,7,8,8,8,8,9,9,9];
    for(let i = 0; i < sizes.sizey; i++){
        for(let j = 0; j < sizes.sizex; j++){
            for(let k = 0; k < wallxcord.length; k++){
                if(wallxcord[k]==i && wallycord[k]==j){
                    map[i][j] = 1;
                    ctx.drawImage(pict.wall, i * sizes.stepLengthx, j * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                    break;
                }else{
                    ctx.drawImage(pict.floor, i * sizes.stepLengthx, j * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
            }
        }
    }
}

export function putCharsToRandSpot(char){
    let finished = false;
    while(finished == false){
        let a = (Math.floor(Math.random() * sizex));
        let b = (Math.floor(Math.random() * sizey));
        let counter = 0;
        for(let i = 10; i< 500; i++){
            if((a!=0&&b!=0) && (map[a][b] != 1) && (map[a][b] < 10)){
                counter += 1;
            }else{break}
        }
        if(counter == 490){
            char.setLocX(a);
            char.setLocY(b);
            finished = true;
        }
    }
}

export function writeStatShort(){
    ctx.fillStyle = 'white';
    ctx.fillRect(9, 795, 710, -70);
    ctx.fillStyle = 'black';
    ctx.fillText(`${hero.getGameLevel()}.pálya | Hős: ${hero.getLevel()}.szint | Életerő: ${Math.floor(hero.getHP())}/${hero.getMaxHP()} | Max.sebzés: ${hero.getSP()} | Pajzs: ${hero.getDP()}${enemy[1].getIsDead()?' (K)':''}`, 10, 750); 
}

export function writeStatLong(ellen){
    ctx.fillStyle = 'white';
    ctx.fillRect(9, 795, 710, -70);
    ctx.fillStyle = 'black';
    ctx.fillText(`${hero.getGameLevel()}.pálya | Hős: ${hero.getLevel()}.szint | Életerő: ${Math.floor(hero.getHP())}/${hero.getMaxHP()} | Max.sebzés: ${hero.getSP()} | Pajzs: ${hero.getDP()}${enemy[1].getIsDead()?' (K)':''}`, 10, 750);
    if(ellen.getIsDead()){
        ctx.fillStyle = 'grey';
    }else{
        ctx.fillStyle = 'black';
    }
    ctx.fillText(`Ellenség: ${ellen.getType()=='skeleton'?'csontvázszörny':'varázsló'} | Életerő: ${ellen.getHP()}/${ellen.getMaxHP()} | Max.sebzés: ${ellen.getSP()} | Pajzs: ${ellen.getDP()}`, 10, 780);
}