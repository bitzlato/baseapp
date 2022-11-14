import { FC, useEffect, useRef } from 'react';
import { createChart, ISeriesApi } from 'lightweight-charts';
import { useP2PKLine } from 'web/src/hooks/useP2PKLine';
import * as colors from 'web/src/theme/colors';
import { useTheme } from 'web/src/components/app/AppContext';

interface Props {
  cryptocurrency: string;
  paymethod: string;
}

export const P2PMiniChart: FC<Props> = ({ cryptocurrency, paymethod }) => {
  const theme = useTheme();
  const kLine = useP2PKLine(`${cryptocurrency}_${paymethod}`);
  const chartElementRef = useRef<HTMLDivElement>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'>>();
  const areaSeriesRef = useRef<ISeriesApi<'Area'>>();

  useEffect(() => {
    if (!chartElementRef.current) {
      return undefined;
    }

    const chart = createChart(chartElementRef.current, {
      width: chartElementRef.current.offsetWidth,
      height: 222,
      timeScale: {
        timeVisible: true,
        fixLeftEdge: true,
        barSpacing: 12,
        borderColor: theme === 'dark' ? colors.white05 : colors.black10,
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? colors.white05 : colors.black10,
      },
      layout: {
        background: { color: theme === 'dark' ? colors.ebonyClay : colors.white },
        textColor: theme === 'dark' ? colors.whiteLilac : colors.mineShaft,
      },
      grid: {
        vertLines: { color: theme === 'dark' ? colors.white05 : colors.black10 },
        horzLines: { color: theme === 'dark' ? colors.white05 : colors.black10 },
      },
    });

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        if (!chartElementRef.current) {
          return;
        }

        chart.resize(chartElementRef.current.offsetWidth, 222);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    areaSeriesRef.current = chart.addAreaSeries({
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      lineColor: 'transparent',
      topColor: theme === 'dark' ? colors.tuna : colors.sapphire,
      bottomColor: theme === 'dark' ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)',
    });

    candleSeriesRef.current = chart.addCandlestickSeries();
    candleSeriesRef.current.applyOptions({
      wickUpColor: theme === 'dark' ? colors.milanoGreen : colors.silverTree,
      upColor: theme === 'dark' ? colors.milanoGreen : colors.silverTree,
      wickDownColor: theme === 'dark' ? colors.carnation : colors.mandy,
      downColor: theme === 'dark' ? colors.carnation : colors.mandy,
      borderVisible: false,
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      chart?.remove();
    };
  }, [theme]);

  useEffect(() => {
    if (!candleSeriesRef.current || !areaSeriesRef.current || !kLine) {
      return;
    }

    areaSeriesRef.current.setData(
      kLine.map((item) => ({
        time: item.time,
        value: (item.close + item.open) / 2,
      })),
    );

    candleSeriesRef.current.setData(kLine);
  }, [kLine]);

  return <div ref={chartElementRef} />;
};
