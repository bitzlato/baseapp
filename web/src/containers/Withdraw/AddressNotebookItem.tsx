import { useState, MouseEvent } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { NotebookAddress } from 'web/src/modules/p2p/notebook';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { WarningIcon } from 'web/src/mobile/assets/images/WarningIcon';
import TrashIcon from 'web/src/assets/svg/TrashIcon.svg';
import * as s from './AddressNotebook.css';

interface Props {
  id: number;
  isSelected: boolean;
  address: string | undefined;
  description: string | undefined;
  blockchainName?: string | undefined;
  isPending?: boolean | undefined;
  onSelect: (id: NotebookAddress['id']) => void;
  onDelete: (id: NotebookAddress['id']) => void;
}

export const AddressNotebookItem = ({
  id,
  isSelected,
  address,
  description,
  blockchainName,
  isPending = false,
  onSelect,
  onDelete,
}: Props) => {
  const t = useT();
  const [controlsOpen, setControlsOpen] = useState(false);

  const handleMouseOver = () => setControlsOpen(true);

  const handleMouseLeave = () => setControlsOpen(false);

  const handleTooltipClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleSelect = () => {
    onSelect(id);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(id);
  };

  return (
    <Box
      key={id}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height={{ mobile: 'auto', desktop: '9x' }}
      width="full"
      px="5x"
      py={{ mobile: '2x', desktop: '0' }}
      mb="1x"
      backgroundColor={{
        default: isSelected ? 'addressDropdownSelectedBg' : 'transparent',
        hover: 'addressDropdownHoverBg',
      }}
      cursor="pointer"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
    >
      <Box
        display="flex"
        flexDirection={{ mobile: 'column', desktop: 'row' }}
        alignItems={{ mobile: 'flex-start', desktop: 'center' }}
        width="full"
        justifyContent="space-between"
      >
        <Box
          flexShrink={0}
          color="text"
          fontWeight="strong"
          textOverflow="ellipsis"
          textAlign="left"
          className={s.addressName}
          mb={{ mobile: '1x', desktop: '0' }}
        >
          {isPending ? (
            <Tooltip label={t('page.body.wallets.beneficiaries.dropdown.pending')} placement="top">
              <Box
                as="span"
                display="inline-block"
                flexShrink={0}
                mb={{ mobile: '1x', desktop: '0' }}
                mr={{ mobile: '0', desktop: '1x' }}
                onClick={handleTooltipClick}
              >
                <WarningIcon />
              </Box>
            </Tooltip>
          ) : null}

          {description}
        </Box>
        {blockchainName ? (
          <Box
            as="span"
            flexGrow={1}
            color="textMuted"
            fontWeight="regular"
            textOverflow="ellipsis"
            textAlign="left"
            width={{ mobile: 'full', desktop: 'auto' }}
            ml={{ mobile: '0', desktop: '4x' }}
          >
            {blockchainName}
          </Box>
        ) : null}
        <Box
          as="span"
          flexGrow={1}
          color="textMuted"
          fontWeight="regular"
          textOverflow="ellipsis"
          textAlign="left"
          width={{ mobile: 'full', desktop: 'auto' }}
          ml={{ mobile: '0', desktop: '4x' }}
        >
          {address}
        </Box>
      </Box>
      <Box
        flexShrink={0}
        display="flex"
        alignItems="center"
        className={cn(s.controls, controlsOpen && s.controlsOpen)}
      >
        <Box
          as="button"
          ml="2x"
          p="2x"
          title={t('Delete')}
          color={{ default: 'btnDangerBg', hover: 'btnDangerBgHover' }}
          onClick={handleDelete}
        >
          <TrashIcon />
        </Box>
      </Box>
    </Box>
  );
};
