import { FC } from 'react';
import { useChatDatetimeFormat } from 'web/src/components/shared/Chat/useChatDatetimeFormat';
import { Box } from 'web/src/components/ui/Box';

interface TimeProps {
  time: number;
}

export const ChatMessageTime: FC<TimeProps> = ({ time }) => {
  const { full, relative } = useChatDatetimeFormat(time);

  return (
    <Box fontSize="caption" color="textMuted" title={full}>
      {relative}
    </Box>
  );
};
