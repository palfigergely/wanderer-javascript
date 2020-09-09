'use strict'

import { sizes, drawMap, map, putCharsToRandSpot, writeStatShort, } from './playground';
import { ctx } from './index';
import { Boss, Skeleton, enemy, Hero } from './Character';

export let hero;

export function game(level){
    drawMap(level);
    if(level == 1){
        hero = new Hero();
    }
    ctx.drawImage(hero.getPictureDown(), 0 * sizes.stepLengthx, 0 * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
    hero.setLocX(0);
    hero.setLocY(0);
    if(level == 1){
        alert('Üdvözöllek Vándor!\n\n'+
        ' A kurzor vagy WASD gombok segítségével tudsz mozogni!\n\n'+
        ' A katakombákat ellepték a csontvázszörnyek és gonosz varázslók, meg kell tisztítanod tőlük a tárnákat.\n'+
        ' Megtámadni az ellenséget, azonos mezőre lépéssel és a <space> gomb megnyomásával tudod.\n'+
        ' A csontszörnyek egyikénél egy kulcsot találsz, amely birtokában a következő szintre léphetsz.\n'+
        ' Ehhez azonban le kell győznöd előbb a csontszörnyeket irányító gonosz varázsló-fejedelmet.\n\n'+
        ' Kétszer gyorsabban mozogsz mint az ellenségeid, próbáld meg ezt kihasználni!\n\n'+
        'RECIPE FERRUM!');
    }
    let boss = new Boss(level);
    enemy.push(boss);
    putCharsToRandSpot(boss);
    map[boss.getLocX()][boss.getLocY()] = 10;
    ctx.drawImage(boss.getPictureDown(), boss.getLocX() * sizes.stepLengthx, boss.getLocY() * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);

    let numberOfSkeletons = (Math.floor(Math.random() * 4)) + 2;
    for(let i = 0; i < numberOfSkeletons; i++){
        if(i == 0){
            let skeleton = new Skeleton(level, true);
            enemy.push(skeleton);
            putCharsToRandSpot(skeleton);
            map[skeleton.getLocX()][skeleton.getLocY()] = 11+i;
        }else{
            let skeleton = new Skeleton(level, false);
            enemy.push(skeleton);
            putCharsToRandSpot(skeleton);
            map[skeleton.getLocX()][skeleton.getLocY()] = 11+i;
        }
    }
    enemy.map(enemy => {ctx.drawImage(enemy.getPictureDown(), enemy.getLocX()*sizes.stepLengthx, enemy.getLocY()*sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy)});
    writeStatShort();
    //the game is happening here...
}