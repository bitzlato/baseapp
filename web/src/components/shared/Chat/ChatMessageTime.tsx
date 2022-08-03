import { FC } from 'react';
import { useChatDatetimeFormat } from 'web/src/components/shared/Chat/useChatDatetimeFormat';
import { Box } from 'web/src/components/ui/Box';

interface TimeProps {
  time: number;
}

export const ChatMessageTime: FC<TimeProps> = ({ time }) => {
  const format = useChatDatetimeFormat();
  const { full, relative } = format(time);

  return (
    <Box fontSize="caption" color="textMuted" title={full}>
      {relative}
    </Box>
  );
};
