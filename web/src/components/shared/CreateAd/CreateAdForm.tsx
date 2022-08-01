import { CreateAdFormProvider } from './CreateAdFormContext';
import { CreateAdFormSteps } from './CreateAdFormSteps';

export const CreateAdForm = () => {
  return (
    <CreateAdFormProvider>
      <CreateAdFormSteps />
    </CreateAdFormProvider>
  );
};
