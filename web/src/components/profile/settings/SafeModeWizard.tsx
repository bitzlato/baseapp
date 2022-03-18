import { FC, ReactNode, useState } from 'react';
import { useUpdateProfile } from 'web/src/hooks/mutations/useUpdateProfile';
import { useT } from 'web/src/hooks/useT';
import { Button } from 'web/src/components/ui/Button';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import { RadioGroup, Radio } from 'web/src/components/form/Radio';
import { ModalBody } from 'web/src/components/ui/Modal';

interface SafeModeWizardProps {
  onClose?: () => void;
}

const CORRECT_ANSWER = '1';
const FINISH_STEP = 4;

export const SafeModeWizard: FC<SafeModeWizardProps> = ({ onClose }) => {
  const t = useT();
  const updateProfileMutate = useUpdateProfile();
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);
  const [step, setStep] = useState(0);
  const [invalid, setInvalid] = useState(false);

  const handleClickNext = () => {
    const nextStep = step + 1;
    if (step !== 0 && answers[step] !== CORRECT_ANSWER) {
      setInvalid(true);
      setAnswers([]);
      setStep(0);

      return;
    }

    if (nextStep === FINISH_STEP) {
      updateProfileMutate({ passSafetyWizard: true, safeModeEnabled: false });
    }

    setStep(nextStep);
  };

  const handeChangeQuestion = (nextValue: string | undefined) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = nextValue;

      return next;
    });
  };

  let body: ReactNode;
  let nextButton: ReactNode;
  let closeButton: ReactNode = (
    <Button color="secondary" variant="outlined" onClick={onClose}>
      {t('Cancel')}
    </Button>
  );

  switch (step) {
    case 1: {
      body = (
        <>
          <Box mb="4x">{t('safemode.question1')}</Box>
          <RadioGroup name="answer" value={answers[1]} onChange={handeChangeQuestion}>
            <Stack direction="column" marginBottom="2x">
              <Radio value="0">{t('Yes')}</Radio>
              <Radio value="1">{t('No')}</Radio>
            </Stack>
          </RadioGroup>
        </>
      );
      nextButton = (
        <Button color="secondary" disabled={answers[1] === undefined} onClick={handleClickNext}>
          {t('safemode.next_question')}
        </Button>
      );

      break;
    }

    case 2: {
      body = (
        <>
          <Box mb="4x">{t('safemode.question2')}</Box>
          <RadioGroup name="answer" value={answers[2]} onChange={handeChangeQuestion}>
            <Stack direction="column" marginBottom="2x">
              <Radio value="0">{t('Yes')}</Radio>
              <Radio value="1">{t('No')}</Radio>
            </Stack>
          </RadioGroup>
        </>
      );
      nextButton = (
        <Button color="secondary" disabled={answers[2] === undefined} onClick={handleClickNext}>
          {t('safemode.next_question')}
        </Button>
      );

      break;
    }

    case 3: {
      body = (
        <>
          <Box mb="4x">{t('safemode.question3')}</Box>
          <RadioGroup name="answer" value={answers[3]} onChange={handeChangeQuestion}>
            <Stack direction="column" marginBottom="2x">
              <Radio value="0">{t('Right')}</Radio>
              <Radio value="1">{t('safemode.check_is_gift')}</Radio>
            </Stack>
          </RadioGroup>
        </>
      );
      nextButton = (
        <Button color="secondary" disabled={answers[3] === undefined} onClick={handleClickNext}>
          {t('safemode.next_question')}
        </Button>
      );

      break;
    }

    case 4: {
      body = (
        <Text variant="label" color="success">
          {t('safemode.success')}
        </Text>
      );
      closeButton = (
        <Button color="secondary" variant="outlined" onClick={onClose}>
          {t('Close')}
        </Button>
      );

      break;
    }

    case 0:
    default: {
      body = invalid ? (
        <Text variant="label" color="danger">
          {t('safemode.error')}
        </Text>
      ) : (
        t('safemode.begin')
      );
      nextButton = (
        <Button color="secondary" onClick={handleClickNext}>
          {t('safemode.start_test')}
        </Button>
      );
      break;
    }
  }

  return (
    <>
      <ModalBody>{body}</ModalBody>
      <Box px="6x" pt="6x" pb="4x">
        <Stack
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          marginBottom="3x"
        >
          {nextButton}
          {closeButton}
        </Stack>
      </Box>
    </>
  );
};
