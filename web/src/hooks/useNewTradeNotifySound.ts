import Bugsnag from '@bugsnag/js';
import { useCallback } from 'react';
import { p2pUrl } from 'web/src/api/config';
import { useNotificationSubscribe } from 'web/src/components/app/AppContext';
import { TradeInfo, TradeStatus } from 'web/src/components/shared/Trade/types';
import { fetchWithCreds } from 'web/src/helpers/fetch';

const NEW_TRADE_SOUND_URL = `${process.env.ASSET_PATH}new_trade_sound.wav`;

const playNewTradeSound = async () => {
  try {
    await new Audio(NEW_TRADE_SOUND_URL).play();
  } catch (err: any) {
    Bugsnag.notify(err);
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
