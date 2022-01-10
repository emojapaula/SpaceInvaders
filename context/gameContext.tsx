import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AxiosInstance } from '../auth/AxiosInstance';

export interface IGame {
  board: string[];
}

interface IGameContext {
  //   students: IGame[];
  board: string[];

  //   teacherName: string;
  /*classId: number; //string */
}

interface IGameMethods {
  moveDown: () => boolean;
  shoot: (stupac: number) => boolean;
}

interface IGameProvider {
  children: React.ReactNode;
}

const initialGameData: IGameContext = {
  board: [],
};

const monsters: string[] = [
  'space_invader',
  'skull_and_crossbones',
  'japanese_ogre',
  'skull',
  'ghost',
  'smiling_imp',
  'japanese_goblin',
  'alien',
];

interface IGameData extends IGameContext, IGameMethods {}

export default function GameProvider({ children }: IGameProvider): React.ReactElement {
  const initializeBoard = () => {
    //napravi polje sa velicinom 1
    let gameBoard: string[] = ['0'];
    //dodaj 63 nule da polje bude 64
    for (let i = 0; i < 63; ++i) {
      gameBoard.push('0');
    }
    //inicijaliziraj 10 cudovista (oznake cudovista 1,2,3,4) u prva 3 reda
    for (let i = 0; i < 10; ++i) {
      let position = Math.floor(Math.random() * 24);
      let monster = Math.floor(Math.random() * 8);
      if (gameBoard[position] === '0') {
        // gameBoard[position] = monster.toString();
        gameBoard[position] = monsters[monster];
      } else {
        --i;
      }
    }
    //inicijaliziraj jednog nekog u 4. red 🙂
    let pozicija = 24 + Math.floor(Math.random() * 8);
    gameBoard[pozicija] = monsters[Math.floor(Math.random() * 8)];

    return gameBoard;
  };
  const [board, setBoard] = useState<string[]>(initializeBoard());
  const [shootingCounter, setShootingCounter] = useState(0);

  function moveDown() {
    let gameBoard = board;
    for (let i = 56; i < 64; ++i) {
      if (gameBoard[i] !== '0') {
        return true;
      }
    }

    for (let i = 63; i >= 8; --i) {
      gameBoard[i] = gameBoard[i - 8];
    }
    //BUG
    for (let i = 0; i < 8; ++i) {
      gameBoard[i] = '0';
    }
    setBoard(gameBoard);
    console.log('jesam');
    return false;
  }

  function shoot(stupac: number) {
    setShootingCounter(shootingCounter + 1);
    // console.log(shootingCounter);
    let gameBoard = board;

    if (stupac < 1 || stupac > 8) return false;
    for (let i = 63 - (8 - stupac); i >= 0; i -= 8) {
      console.log(i, 'tu je', gameBoard[i]);
      if (gameBoard[i] !== '0') {
        gameBoard[i] = '0';
        setBoard(gameBoard);
        return true;
      }
    }
    return false;
  }

  console.log('prolaz', shootingCounter);

  /* useEffect(() => {
    if (shootingCounter % 3 === 0 && shootingCounter !== 0) {
      console.log('bravo', shootingCounter);
      moveDown();
    }
  }); */

  return <GameContext.Provider value={{ board, moveDown, shoot }}>{children}</GameContext.Provider>;
}

export const GameContext = createContext(initialGameData as IGameData);

export const useGameData = (): IGameData => useContext(GameContext);
