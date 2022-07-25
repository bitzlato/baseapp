import { useMemo } from 'react';
import { useUser } from 'web/src/components/app/AppContext';
import { useFetchPublicFeatures } from 'web/src/hooks/data/barong/useFetchPublicFeatures';
import { FeatureMap } from 'web/src/types/featuresToggling.types';

export const useFeatureEnabled = (name: string) => {
  const user = useUser();
  const { data: publicFeatures } = useFetchPublicFeatures();

  const userFeaturesMap = user?.features ?? {};
  const publicFeaturesMap = useMemo(
    () =>
      publicFeatures?.reduce<FeatureMap>((acc, item) => {
        acc[item.name] = item.enabled;

        return acc;
      }, {}),
    [publicFeatures],
  );

  return userFeaturesMap?.[name] ?? publicFeaturesMap?.[name] ?? false;
};
