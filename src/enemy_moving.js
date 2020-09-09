'use strict'

import { sizes, writeStatLong } from "./playground";
import { enemy } from './Character';
import { map } from './playground';
import { hero } from './game';

export function enemyMove(){
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