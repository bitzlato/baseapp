import Bugsnag from '@bugsnag/js';
import { useCallback } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { useNotificationSubscribe } from 'web/src/components/app/AppContext';
import { TradeInfo, TradeStatus } from 'web/src/components/shared/Trade/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';

const NEW_TRADE_SOUND_URL = `${process.env.ASSET_PATH}new_trade_sound.wav`;
const USER_INTERACTION_EVENTS = ['click', 'mousedown', 'keydown'];

const playNewTradeSound = async () => {
  const newTradeSound = new Audio(NEW_TRADE_SOUND_URL);

  const playAgain = async () => {
    try {
      await newTradeSound.play();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      removeListeners();
    } catch (error) {
      if (error instanceof Error && error.name !== 'NotAllowedError') {
        Bugsnag.notify(error);
      }
    }
  };

  const addListeners = () => {
    USER_INTERACTION_EVENTS.forEach((event) => {
      document.addEventListener(event, playAgain, { once: true });
    });
  };

  const removeListeners = () => {
    USER_INTERACTION_EVENTS.forEach((event) => {
      document.removeEventListener(event, playAgain);
    });
  };

  try {
    await newTradeSound.play();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError') {
        // Await user interaction in site because Audio.play() blocked by browser when user has not interact before playing
        addListeners();
      } else {
        Bugsnag.notify(error);
      }
    }
  }
};

export const useNewTradeNotifyWithSound = () => {
  useNotificationSubscribe(
    useCallback(async (notify) => {
      if (notify.name === 'tradeStatusChanged' && 'tradeId' in notify && notify.tradeId) {
        const trade: TradeInfo = await fetchWithCreds(`${p2pUrl()}/trade/${notify.tradeId}`);

        if (trade.status === TradeStatus.TRADE_CREATED) {
          playNewTradeSound();
        }
      }
    }, []),
  );
};
