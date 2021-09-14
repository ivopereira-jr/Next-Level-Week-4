import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';
import { api } from '../services/api';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  experience: number;
  currentExperienceToNextLevel: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  experience: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps): JSX.Element {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [experience, setExperience] = useState(rest.experience ?? 0);
  const [currentExperienceToNextLevel, setCurrentExperienceToNextLevel] =
    useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [islevelUpModalOpen, setIslevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    // pedir permição ao usuario para notificaçoes
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    async function saveExperience(): Promise<void> {
      try {
        await api.put('/experience', {
          level,
          experience,
          currentExperienceToNextLevel,
          challengesCompleted,
        });
      } catch (err) {
        console.log(err);
      }
    }

    saveExperience();
  }, [challengesCompleted]);

  function levelUp(): void {
    setLevel(level + 1);
    setIslevelUpModalOpen(true);
  }

  function closeLevelUpModal(): void {
    setIslevelUpModalOpen(false);
  }

  function startNewChallenge(): void {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    // tocar audio quando terminar o ciclo
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      // criar a notificação
      /* eslint no-new: "error" */
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge(): void {
    setActiveChallenge(null);
  }

  async function completeChallenge(): Promise<void> {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperienceToNextLevel + amount;

    if (finalExperience > experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setExperience(experience + amount);
    setCurrentExperienceToNextLevel(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        experience,
        currentExperienceToNextLevel,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {islevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
