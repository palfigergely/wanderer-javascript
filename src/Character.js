'use strict'
import { dice } from './dice';
import { sizes, map, writeStatShort, writeStatLong } from './playground';
import { ctx } from './index';
import { pict } from './graphic';
import { enemyMove } from './enemy_moving';
import { game, hero } from './game';

export let enemy = [];

export class Character{
    type;
    locx;
    locy;
    maxhp;
    hp;
    sp;
    dp;
    isDead;
    picleft;
    picright;
    picup;
    picdown;


    constructor(){
        this.isDead = false;
        this.picleft = pict.skeleton;
        this.picright = pict.skeleton;
        this.picup = pict.skeleton;
        this.picdown = pict.skeleton;
        this.locx = 0;
        this.locy = 0;
    }

    getType(){
        return this.type;
    }

    getStrikeValue(){
        return (2*dice())+this.sp;
    }
    getMaxHP(){
        return this.maxhp;
    }
    getHP(){
        return this.hp;
    }
    setHP(hp){
        this.hp = hp;
    }
    addHP(life){
        this.hp += life;
    }
    getSP(){
        return  this.sp;
    }
    getDP(){
        return this.dp;
    }
    addDP(dp){
        this.dp += dp;
    }
    getIsDead(){
        return this.isDead;
    }
    setIsDead(ans){
        this.isDead = ans;
    }
    getPictureUp(){
        return this.picup;
    }
    setPictureUp(picture){
        this.picup = picture;
    }
    getPictureDown(){
        return this.picdown;
    }
    setPictureDown(picture){
        this.picup = picture;
    }
    getPictureLeft(){
        return this.picleft;
    }
    setPictureLeft(picture){
        this.picup = picture;
    }
    getPictureRight(){
        return this.picright;
    }
    setPictureRight(picture){
        this.picup = picture;
    }

    getLocX(){
        return this.locx;
    }
    getLocY(){
        return this.locy;
    }

    setLocX(input){
        this.locx = input;
    }
    setLocY(input){
        this.locy = input;
    }

    moveLeft(){
        let answer;
        if(this.locx != 0){
            if(map[this.locx-1][this.locy] != 1){
                this.locx -= 1;
                answer = true;
                if(Math.abs(map[hero.getLocX()][hero.getLocY()]) >= 10){
                    writeStatLong(enemy[Math.abs(map[hero.getLocX()][hero.getLocY()])-10]);
                }else{
                    writeStatShort();
                }
                ctx.drawImage(pict.floor, (this.locx+1) * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picleft, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(map[this.locx+1][this.locy] < 0){
                    ctx.drawImage(pict.grave, (this.locx+1) * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
            }else{
                answer = false;
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picleft, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
            }
        }else{
            answer = false
        }
        return answer;
    }
    
    moveRight(){
        let answer;
        if(this.locx != sizes.sizex-1){
            if(map[this.locx+1][this.locy] != 1){
                this.locx += 1;
                answer = true;
                if(Math.abs(map[hero.getLocX()][hero.getLocY()]) >= 10){
                    writeStatLong(enemy[Math.abs(map[hero.getLocX()][hero.getLocY()])-10]);
                }else{
                    writeStatShort();
                }
                ctx.drawImage(pict.floor, (this.locx-1) * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picright, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(map[this.locx-1][this.locy] < 0){
                    ctx.drawImage(pict.grave, (this.locx-1) * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
            }else{
                answer = false;
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picright, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
            }
        }
        return answer;
    }
    
    moveUp(){
        let answer;
        if(this.locy != 0){
            if(map[this.locx][this.locy-1] != 1){
                this.locy -= 1;
                answer = true;
                if(Math.abs(map[hero.getLocX()][hero.getLocY()]) >= 10){
                    writeStatLong(enemy[Math.abs(map[hero.getLocX()][hero.getLocY()])-10]);
                }else{
                    writeStatShort();
                }
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, (this.locy+1) * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picup, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(map[this.locx][this.locy+1] < 0){
                    ctx.drawImage(pict.grave, this.locx * sizes.stepLengthx, (this.locy+1) * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
            }else{
                answer = false;
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picup, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
            }
        }
        return answer;
    }
    
    moveDown(){
        let answer;
        if(this.locy != sizes.sizey-1){
            if(map[this.locx][this.locy+1] != 1){    
                this.locy += 1;
                answer = true;
                if(Math.abs(map[hero.getLocX()][hero.getLocY()]) >= 10){
                    writeStatLong(enemy[Math.abs(map[hero.getLocX()][hero.getLocY()])-10]);
                }else{
                    writeStatShort();
                }
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, (this.locy-1) * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(map[this.locx][this.locy] < 0){
                    ctx.drawImage(pict.grave, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
                ctx.drawImage(this.picdown, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(map[this.locx][this.locy-1] < 0){
                    ctx.drawImage(pict.grave, this.locx * sizes.stepLengthx, (this.locy-1) * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                }
            }else{
                answer = false;
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.picdown, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
            }
        }
        return answer;
    }

    battle(opponent){
        let message = 'Ohhh... Az ellenség halálra sebzett.\nA játék és a dal itt számodra most véget ér.\n\nMegpróbálod még egyszer?'
        while(this.isDead==false && opponent.isDead==false){
            let sv = 2*dice()+this.sp;
            if(sv > opponent.dp){
                opponent.addHP(-(sv-opponent.dp));
            }
            if(opponent.getHP()<=0){
                map[opponent.getLocX()][opponent.getLocY()] *= (-1);
                opponent.setIsDead(true);
                opponent.setHP(0);
                opponent.setPictureDown(pict.grave);
                opponent.setPictureUp(pict.grave);
                opponent.setPictureLeft(pict.grave);
                opponent.setPictureRight(pict.grave);
                ctx.drawImage(pict.floor, opponent.getLocX() * sizes.stepLengthx, opponent.getLocY() * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(pict.grave, opponent.getLocX() * sizes.stepLengthx, opponent.getLocY() * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(this.getPictureDown(), this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(hero.getIsDead() == true){
                    writeStatShort();
                    alert(message);
                    window.location.reload();
                }else{
                    hero.levelUp();
                }
                if(enemy[0].getIsDead() && enemy[1].getIsDead()){
                    hero.enterNextArea();
                    hero.addGameLevel(1);
                    enemy = [];
                    game(hero.getGameLevel());
                }
                break;
            }
            let svOther = 2*dice()+opponent.getSP();
            if(svOther > this.dp){
                this.addHP(-(svOther-this.dp));
            }
            if(this.getHP() <= 0){
                map[this.locx][this.locy] *= (-1);
                this.isDead = true;
                this.hp = 0;
                this.setPictureDown(pict.grave);
                this.setPictureUp(pict.grave);
                this.setPictureLeft(pict.grave);
                this.setPictureRight(pict.grave);
                ctx.drawImage(pict.floor, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(pict.grave, this.locx * sizes.stepLengthx, this.locy * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                ctx.drawImage(opponent.getPictureDown(), opponent.getLocX() * sizes.stepLengthx, opponent.getLocY() * sizes.stepLengthy, sizes.stepLengthx, sizes.stepLengthy);
                if(hero.getIsDead() == true){
                    writeStatShort();
                    alert(message);
                    window.location.reload();
                }else{
                    hero.levelUp();
                }
                if(enemy[0].getIsDead() && enemy[1].getIsDead()){
                    hero.enterNextArea();
                    hero.addGameLevel(1);
                    enemy = [];
                    game(hero.getGameLevel());
                }
                break;
            }
        }
    }
}

export class Hero extends Character{
    stepcounter;
    level;
    gamelevel;

    constructor(){
        super();
        this.type = 'hero';
        this.level = 1;
        this.gamelevel = 1;
        this.picleft = pict.herol;
        this.picright = pict.heror;
        this.picup = pict.herou;
        this.picdown = pict.herod;
        this.maxhp = 20 + (3 * dice());
        this.hp = this.maxhp;
        this.sp = 5 + dice();
        this.dp = 2 * dice();
        this.stepcounter = 0;
    }

    moveLeft(){
        if(super.moveLeft()){
            this.stepcounter += 1;
            if(map[this.locx][this.locy] >= 10 && this.getStepCounter() % 2 == 0){
                this.battle();
            }
            enemyMove();
            return true;
        }else return false;
    }

    moveRight(){
        if(super.moveRight()){
            this.stepcounter += 1;
            if(map[this.locx][this.locy] >= 10 && this.getStepCounter() % 2 == 0){
                this.battle();
            }
            enemyMove();
            return true;
        }else return false;
    }

    moveUp(){
        if(super.moveUp()){
            this.stepcounter += 1;
            if(map[this.locx][this.locy] >= 10 && this.getStepCounter() % 2 == 0){
                this.battle();
            }
            enemyMove();
            return true;
        }else return false;
    }

    moveDown(){
        if(super.moveDown()){
            this.stepcounter += 1;
            if(map[this.locx][this.locy] >= 10 && this.getStepCounter() % 2 == 0){
                this.battle();
            }
            enemyMove();
            return true;
        }else return false;
    }

    battle(){
        if(map[this.locx][this.locy] >= 10){
            super.battle(enemy[(map[this.locx][this.locy])-10]);
            writeStatLong(enemy[(Math.abs(map[this.locx][this.locy]))-10]);
        }
    }

    levelUp(){
        this.level += 1;
        this.maxhp += Math.floor(dice()/3);
        this.dp += Math.floor(dice()/3);
        this.sp += Math.floor(dice()/3);
    }

    getLevel(){
        return this.level;
    }

    getStepCounter(){
        return this.stepcounter;
    }

    getGameLevel(){
        return this.gamelevel;
    }
    addGameLevel(added){
        this.gamelevel += added;
    }

    enterNextArea(){
        let chance = Math.floor(Math.random()*10)+1;
        if(chance == 1){
            this.hp = this.maxhp;
        }else if(chance > 1 && chance < 6){
            if(this.hp * 4/3 >= this.maxhp){
                this.hp = this.maxhp;
            }else{
                this.addHP(this.hp/3);
            }
        }else if(chance >= 6){
            if(this.hp * 1.1 >= this.maxhp){
                this.hp = this.maxhp;
            }else{
                this.addHP(this.hp * 0.1);
            }
        }
    }
}

export class Skeleton extends Character{
    hasKey;
    
    constructor(level, keyholder){
        super();
        this.type = 'skeleton';
        this.maxhp = 2 * level * dice();
        this.hp = this.maxhp;
        this.sp = level * dice();
        this.dp = level/2 * dice();
        this.hasKey = keyholder;
    }
}

export class Boss extends Character{
    constructor(level){
        super();
        this.type = 'boss';
        this.picleft = pict.boss;
        this.picright = pict.boss;
        this.picup = pict.boss;
        this.picdown = pict.boss;
        this.maxhp = (2 * level * dice()) + dice() + Math.floor(hero.getLevel()/2);
        this.hp = this.maxhp;
        this.sp = level * dice() + level;
        this.dp = Math.floor(hero.getLevel()/2) * level/2 * dice() + dice()/2;
    }
}