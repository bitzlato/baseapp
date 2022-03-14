import { FC, useRef, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { Modal, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { useFetchReferralLinks } from 'web/src/hooks/data/useFetchReferralLinks';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { copy } from 'web/src/helpers/copy';
import { ReferralLink as ReferralLinkType } from 'web/src/modules/user/profile/types';
import * as s from './ProfileReferralLinks.css';

const getLinkName = ({ type, target }: ReferralLinkType) => {
  if (type === 'telegram') {
    return 'Telegram';
  }
  if (type === 'web' && target === 'p2p') {
    return 'Web Bitzlato P2P';
  }
  if (type === 'web' && target === 'market') {
    return 'Web Bitzlato Exchange';
  }
  return type;
};

const ReferralLink: FC<ReferralLinkType> = (props) => {
  const { url } = props;
  const t = useT();
  const urlRef = useRef<HTMLInputElement>(null);

  const handleClickCopy = () => {
    if (urlRef.current) {
      copy(urlRef.current);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      borderBottomWidth="1x"
      borderBottomColor="modalHeaderBorderBottom"
      borderBottomStyle="solid"
    >
      <Box flexGrow={1} my="4x">
        <Box mb="2x">
          <Text variant="label" fontWeight="strong">
            {getLinkName(props)}
          </Text>
        </Box>
        <Box
          ref={urlRef}
          as="input"
          className={s.inputUrl}
          color="text"
          fontSize="small"
          value={url}
          readOnly
        />
      </Box>
      <IconButton onClick={handleClickCopy} title={t('page.body.profile.content.copyLink')}>
        <CopyIcon />
      </IconButton>
    </Box>
  );
};

export const ProfileReferalLinks: FC = () => {
  const t = useT();
  const { data } = useFetchReferralLinks();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button color="secondary" onClick={handleClick}>
        {t('Referral Links')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('Referral Links')}</ModalHeader>
        <Box
          fontSize="medium"
          mx="6x"
          borderTopWidth="1x"
          borderColor="modalHeaderBorderBottom"
          borderTopStyle="solid"
        >
          {data?.links.map((referralLink) =>
            referralLink.target !== 'market' ? (
              <ReferralLink key={referralLink.type} {...referralLink} />
            ) : null,
          )}
        </Box>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
