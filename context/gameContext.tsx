import React, { createContext, useContext, useState } from 'react';
import { AxiosInstance } from '../auth/AxiosInstance';

export interface IGame {
  board: string[];
}

interface IGameContext {
  board: string[];
  gameOver: boolean;
}

interface IGameMethods {
  moveDown: () => boolean;
  shoot: (stupac: number, expression: string) => void;
  startGame: () => void;
}

interface IGameProvider {
  children: React.ReactNode;
}

const initialGameData: IGameContext = {
  board: [],
  gameOver: false,
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
  const initializeEmptyBoard = () => {
    //napravi polje sa velicinom 1
    let gameBoard: string[] = ['0'];
    //dodaj 63 nule da polje bude 64
    for (let i = 0; i < 63; ++i) {
      gameBoard.push('0');
    }
    return gameBoard;
  };

  const [board, setBoard] = useState<string[]>(initializeEmptyBoard());
  const [shootingCounter, setShootingCounter] = useState(1);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(0);
  const [result, setResult] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeBoard = () => {
    let gameBoard = initializeEmptyBoard();
    //inicijaliziraj 10 cudovista (oznake cudovista 1,2,3,4) u prva 3 reda
    for (let i = 0; i < 10; ++i) {
      let position = Math.floor(Math.random() * 24);
      let monster = Math.floor(Math.random() * 8);
      if (gameBoard[position] === '0') {
        gameBoard[position] = monsters[monster];
      } else {
        --i;
      }
    }
    //inicijaliziraj jednog nekog u 4. red 🙂
    let pozicija = 24 + Math.floor(Math.random() * 8);
    gameBoard[pozicija] = monsters[Math.floor(Math.random() * 8)];
    setBoard(gameBoard);
    return gameBoard;
  };

  const startGame = () => {
    initializeBoard();
    setTimer(Date.now());
    setTotalTimeTaken(Date.now());
  };

  const sendFinalResult = async () => {
    let tempTime = Date.now();
    setTotalTimeTaken(tempTime - totalTimeTaken);
    // console.log('total', Math.floor(totalTimeTaken / 1000));
    // console.log(`seconds elapsed total = ${Math.floor(totalTimeTaken / 1000)}`);

    await AxiosInstance.post('/test/testResult', {
      result: result,
      totalTimeTaken: Math.floor(totalTimeTaken / 1000),
    });
  };

  function checkGameOver() {
    let gameBoard = board;

    for (let i = 0; i < 64; ++i) {
      if (gameBoard[i] !== '0') {
        return false;
      }
    }
    setGameOver(true);
    console.log('igra je gotva');
    setBoard(initializeEmptyBoard());
    sendFinalResult();
  }

  function moveDown() {
    let gameBoard = board;
    for (let i = 56; i < 64; ++i) {
      if (gameBoard[i] !== '0') {
        setGameOver(true);
        console.log('igra je gotva');

        sendFinalResult();
        return true;
      }
    }

    for (let i = 63; i >= 8; --i) {
      gameBoard[i] = gameBoard[i - 8];
    }
    for (let i = 0; i < 8; ++i) {
      gameBoard[i] = '0';
    }
    setBoard(gameBoard);
    return false;
  }

  function shoot(stupac: number, expression: string) {
    let enemyKilled = false;
    setTime(Date.now() - timer);
    setTimer(Date.now());
    // console.log(`seconds elapsed = ${Math.floor(time / 1000)}`);
    setShootingCounter(shootingCounter + 1);
    let gameBoard = board;

    if (stupac > 0 && stupac < 9) {
      for (let i = 63 - (8 - stupac); i >= 0; i -= 8) {
        if (gameBoard[i] !== '0') {
          gameBoard[i] = '0';
          setResult(result + 1);
          setBoard(gameBoard);
          enemyKilled = true;
          break;
        }
      }
    }

    sendResult(expression, enemyKilled);
    checkGameOver();

    // return false;
  }

  const sendResult = async (expression: string, enemyKilled: boolean) => {
    await AxiosInstance.post('/test/testEntry', {
      calculation: expression,
      enemyKilled: enemyKilled,
      timeTaken: Math.floor(time / 1000),
    });
  };

  return (
    <GameContext.Provider value={{ startGame, board, moveDown, shoot, gameOver }}>{children}</GameContext.Provider>
  );
}

export const GameContext = createContext(initialGameData as IGameData);

export const useGameData = (): IGameData => useContext(GameContext);
