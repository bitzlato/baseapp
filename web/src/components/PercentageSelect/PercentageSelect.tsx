import { Button } from 'react-bootstrap';
import { CirclePercentIcon } from 'web/src/assets/icons/CirclePercentIcon';

import s from './PercentageSelect.postcss';

interface PercentageSelectProps {
  value?: number | undefined;
  percents: number[];
  disabled: boolean;
  mobile?: boolean;
  onChange?: (value: number) => void | undefined;
}

export const PercentageSelect: React.FC<PercentageSelectProps> = ({
  value,
  percents,
  disabled,
  onChange,
  mobile,
}) => {
  const current = (percents || []).findIndex((v: number) => v === value);

  const handleUsePercent = (index: number) => () => {
    let select = index;

    if (index > percents.length - 1) {
      select = 0;
    }

    if (onChange && percents[select] !== undefined) {
      onChange(percents[select] || 0);
    }
  };

  return mobile ? (
    <Button
      variant="secondary"
      disabled={disabled}
      className={s.percentageButton}
      onClick={handleUsePercent(current + 1)}
    >
      {percents[current] === undefined || disabled ? '' : percents[current]}%
      <CirclePercentIcon
        percent={percents[current]}
        height={16}
        width={16}
        className={s.percentageIcon}
      />
    </Button>
  ) : (
    <>
      {percents.map((v: number, index: number) => (
        <Button
          key={v}
          variant="secondary"
          disabled={disabled}
          className={s.percentageButton}
          onClick={handleUsePercent(index)}
        >
          {v}%
        </Button>
      ))}
    </>
  );
};
