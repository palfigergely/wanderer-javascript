'use strict';

// can return 1,2,3,4,5,6
function dice(){
    return Math.floor((Math.random()*6)+1);
}

const pict = {
    floor: document.getElementById('floor'),
    wall: document.getElementById('wall'),
    herou: document.getElementById('hero-up'),
    herod: document.getElementById('hero-down'),
    herol: document.getElementById('hero-left'),
    heror: document.getElementById('hero-right'),
    boss: document.getElementById('boss'),
    skeleton: document.getElementById('skeleton'),
    grave: document.getElementById('grave')
};

// Set-up the playground
let sizex = 10;
let sizey = sizex;
let width = 720;
let height = width;
let stepLengthx = Math.floor(width / sizex);
let stepLengthy = Math.floor(height / sizey);

let sizes = {
    sizex: sizex,
    sizey: sizey,
    width: width,
    height: height,
    stepLengthx: stepLengthx,
    stepLengthy: stepLengthy
};

let map = [];
    for(let i = 0; i<sizex; i++){
        map.push([]);
        for(let j = 0; j<sizey; j++){
            map[i].push(0);
        }
    }

function drawMap(gamelevel){
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

function putCharsToRandSpot(char){
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

function writeStatShort(){
    ctx.fillStyle = 'white';
    ctx.fillRect(9, 795, 710, -70);
    ctx.fillStyle = 'black';
    ctx.fillText(`${hero.getGameLevel()}.pálya | Hős: ${hero.getLevel()}.szint | Életerő: ${Math.floor(hero.getHP())}/${hero.getMaxHP()} | Max.sebzés: ${hero.getSP()} | Pajzs: ${hero.getDP()}${enemy[1].getIsDead()?' (K)':''}`, 10, 750); 
}

function writeStatLong(ellen){
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


function enemyMove(){
    if(hero.getStepCounter() % 2 == 0){
        let direction;
        for(let i = 0; i < enemy.length; i++){
            let moved = false;
            if(enemy[i].getIsDead() == true){
                moved = true;
                continue;
            }
            let trialcounter = 0;
            while(moved == false && trialcounter < 50){
                direction = Math.floor(Math.random()*4);
                if(direction == 0 && enemy[i].getLocY() != 0){
                    if(map[enemy[i].getLocX()][enemy[i].getLocY()-1] < 10 && map[enemy[i].getLocX()][enemy[i].getLocY()-1] != 1){
                        if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                            enemy[i].battle(hero);
                            writeStatLong(enemy[i]);
                        }
                        if(enemy[i].moveUp()){
                            if(map[enemy[i].getLocX()][enemy[i].getLocY()] < 0){
                                enemy[i].addDP(hero.getGameLevel()/2);
                            }
                            map[enemy[i].getLocX()][enemy[i].getLocY()+1] = 0;
                            map[enemy[i].getLocX()][enemy[i].getLocY()] = i+10;
                            moved = true;
                            if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                                enemy[i].battle(hero);
                                writeStatLong(enemy[i]);
                            }
                            break;
                        }
                    }
                }else if(direction == 1 && enemy[i].getLocY() != sizes.sizey-1){
                    if(map[enemy[i].getLocX()][enemy[i].getLocY()+1] < 10 && map[enemy[i].getLocX()][enemy[i].getLocY()+1] != 1){
                        if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                            enemy[i].battle(hero);
                            writeStatLong(enemy[i]);
                        }
                        if(enemy[i].moveDown()){
                            if(map[enemy[i].getLocX()][enemy[i].getLocY()] < 0){
                                enemy[i].addDP(hero.getGameLevel()/2);
                            }
                            map[enemy[i].getLocX()][enemy[i].getLocY()-1] = 0;
                            map[enemy[i].getLocX()][enemy[i].getLocY()] = i+10;
                            moved = true;
                            if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                                enemy[i].battle(hero);
                                writeStatLong(enemy[i]);
                            }
                            break;
                        }
                    }
                }else if(direction == 2 && enemy[i].getLocX() != 0){
                    if(map[enemy[i].getLocX()-1][enemy[i].getLocY()] < 10 && map[enemy[i].getLocX()-1][enemy[i].getLocY()] != 1){
                        if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                            enemy[i].battle(hero);
                            writeStatLong(enemy[i]);
                        }
                        if(enemy[i].moveLeft()){
                            if(map[enemy[i].getLocX()][enemy[i].getLocY()] < 0){
                                enemy[i].addDP(hero.getGameLevel()/2);
                            }
                            map[enemy[i].getLocX()+1][enemy[i].getLocY()] = 0;
                            map[enemy[i].getLocX()][enemy[i].getLocY()] = i+10;
                            moved = true;
                            if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                                enemy[i].battle(hero);
                                writeStatLong(enemy[i]);
                            }
                            break;
                        }
                    }
                }else if(direction == 3 && enemy[i].getLocX() != sizes.sizex-1){
                    if(map[enemy[i].getLocX()+1][enemy[i].getLocY()] < 10 && map[enemy[i].getLocX()+1][enemy[i].getLocY()] != 1){
                        if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                            enemy[i].battle(hero);
                            writeStatLong(enemy[i]);
                        }
                        if(enemy[i].moveRight()){
                            if(map[enemy[i].getLocX()][enemy[i].getLocY()] < 0){
                                enemy[i].addDP(hero.getGameLevel()/2);
                            }
                            map[enemy[i].getLocX()-1][enemy[i].getLocY()] = 0;
                            map[enemy[i].getLocX()][enemy[i].getLocY()] = i+10;
                            moved = true;
                            if(enemy[i].getLocX()==hero.getLocX() && enemy[i].getLocY()==hero.getLocY()){
                                enemy[i].battle(hero);
                                writeStatLong(enemy[i]);
                            }
                            break;
                        }
                    }
                }
                trialcounter += 1;
            }
        }
    }
}


let enemy = [];

class Character{
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

class Hero extends Character{
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

class Skeleton extends Character{
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

class Boss extends Character{
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

let hero;

function game(level){
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

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas');
export const ctx = canvas.getContext('2d');
ctx.font = "20px Arial";

// Function to handle the key press events
function onKeyPress(event) {
  // Handle arrow keys
  switch (event.keyCode) {
    case 37:
        hero.moveLeft();
        break;
    case 65:
        hero.moveLeft();
        break;
    case 38:
        hero.moveUp();
        break;
    case 87:
        hero.moveUp();
        break;
    case 39:
        hero.moveRight();
        break;
    case 68:
        hero.moveRight();
        break;
    case 40:
        hero.moveDown();
        break;
    case 83:
        hero.moveDown();
        break;
    case 32:
        hero.battle();
        break;    
  }
}
// GAME LEVEL
let startlevel = 1;

// START THE PROGRAM
window.onload = () => {
    // Listen on pressing the keys
    document.body.addEventListener('keydown', onKeyPress);
    game(startlevel);
};