/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';

import { ChallengesContext } from './ChallengeContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  progressPercentBar: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountdown: () => void;
  setNewValueCountdown: (timer: number) => void;
}

interface CountdownContextProviderProps {
  children: ReactNode;
  timer: number;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountdownProvider({
  children,
  ...rest
}: CountdownContextProviderProps): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const initialTime = 25 * 60;
  const [time, setTime] = useState(rest.timer ?? initialTime);
  const [UserDefinedTime, setUserDefinedTime] = useState(
    rest.timer ?? initialTime
  );
  const [progressTime, setProgressTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progressPercentBar = Math.floor((progressTime * 100) / UserDefinedTime);

  function startCountDown(): void {
    setIsActive(true);
  }

  function resetCountdown(): void {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(UserDefinedTime);
    setProgressTime(0);
  }

  function setNewValueCountdown(timer: number): void {
    const newTimerValue = timer * 60;

    setTime(newTimerValue);
    setUserDefinedTime(newTimerValue);
  }

  useEffect(() => {
    Cookies.set('timeConfiguredByUser', String(UserDefinedTime));
  }, [UserDefinedTime]);

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
        setNewValueCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
