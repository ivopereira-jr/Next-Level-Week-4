/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChallengesContext } from './ChallengeContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  progressPercentBar: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountdown: () => void;
}

interface CountdownContextProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;
const initialTime = 25 * 60;

export function CountdownProvider({
  children,
}: CountdownContextProviderProps): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(initialTime);
  const [progressTime, setProgressTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progressPercentBar = Math.floor((progressTime * 100) / initialTime);

  function startCountDown(): void {
    setIsActive(true);
  }

  function resetCountdown(): void {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(initialTime);
    setProgressTime(0);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      setProgressTime(progressTime + 1);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        progressPercentBar,
        hasFinished,
        isActive,
        startCountDown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
