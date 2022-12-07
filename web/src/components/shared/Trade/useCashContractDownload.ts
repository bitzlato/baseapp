import { downloadFile } from 'web/src/components/profile/reports/ReportDownload';
import { useFetchP2PCashContract } from 'web/src/hooks/data/useFetchP2PTrades';
import { RUB_CASH_AD_PAYMETHOD_ID } from 'web/src/constants';
import { Trade } from 'web/src/modules/p2p/trade.types';

interface Props {
  trade: Pick<Trade, 'id' | 'paymethod'>;
}

export const useCashContractDownload = ({ trade }: Props) => {
  const [fetchCashContract] = useFetchP2PCashContract();

  const handleCashContractDownload = async () => {
    if (trade.paymethod.id !== RUB_CASH_AD_PAYMETHOD_ID) {
      return;
    }

    const data = await fetchCashContract(23);

    if (data) {
      downloadFile(data.data, data.filename ?? `Bitzlato trade ${trade.id} cash contract`);
    }
  };

  return handleCashContractDownload;
};
