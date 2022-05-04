import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useFormatDistanceToNow } from 'web/src/hooks/useFormatDistanceToNow';

type Status = 'active' | 'waiting' | 'inactive' | 'rejected';
interface Props {
  status: Status;
}

export const OnlineStatus: FC<Props> = ({ status }) => {
  let bg;
  switch (status) {
    case 'waiting': {
      bg = 'onlineStatusWaiting' as const;
      break;
    }

    case 'inactive': {
      bg = 'onlineStatusInactive' as const;
      break;
    }

    case 'rejected': {
      bg = 'danger' as const;
      break;
    }

    case 'active':
    default: {
      bg = 'success' as const;
      break;
    }
  }

  return <Box display="inline-block" bg={bg} w="2x" h="2x" borderRadius="circle" />;
};

const getStatusByLastActivity = (lastActivity: number) => {
  const then = new Date(lastActivity);
  const now = new Date();
  const diffInMinutes = Math.round((now.getTime() - then.getTime()) / (1000 * 60));

  if (diffInMinutes < 120) {
    return 'active';
  }

  if (diffInMinutes >= 120 && diffInMinutes < 180) {
    return 'waiting';
  }

  return 'inactive';
};

interface OnlineStatusByLastActivityProps {
  lastActivity: number;
}

export const OnlineStatusByLastActivity: FC<OnlineStatusByLastActivityProps> = ({
  lastActivity,
}) => {
  const t = useSharedT();
  const formatDistanceToNow = useFormatDistanceToNow();
  const status = getStatusByLastActivity(lastActivity);
  let text;
  switch (status) {
    case 'waiting': {
      text = t('Was recently');
      break;
    }

    case 'inactive': {
      text = t('Offline');
      break;
    }

    case 'active':
    default: {
      text = t('Online');
      break;
    }
  }

  return (
    <Tooltip label={`${t('Last online')}: ${formatDistanceToNow(lastActivity)}`}>
      <Box display="inline-flex" alignItems="center" fontSize="caption">
        <Box mr="1x">
          <OnlineStatus status={status} />
        </Box>
        {text}
      </Box>
    </Tooltip>
  );
};
