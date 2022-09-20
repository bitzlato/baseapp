import * as React from 'react';
import { useSelector } from 'react-redux';
import { BackButtonMobile } from 'web/src/components/shared/Header/BackButtonMobile';
import { useT } from 'web/src/hooks/useT';
import { Pagination } from '../../../components';
import { useUserActivityFetch } from '../../../hooks';
import {
  RootState,
  selectUserActivity,
  selectUserActivityCurrentPage,
  selectUserActivityFirstElemIndex,
  selectUserActivityLastElemIndex,
  selectUserActivityNextPageExists,
} from '../../../modules';
import { UserActivityItem } from '../../components';

const DEFAULT_LIMIT = 10;

const ProfileAccountActivityMobileScreenComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const t = useT();
  const page = useSelector(selectUserActivityCurrentPage);
  const userActivity = useSelector(selectUserActivity);
  const firstElemIndex = useSelector((state: RootState) =>
    selectUserActivityFirstElemIndex(state, DEFAULT_LIMIT),
  );
  const lastElemIndex = useSelector((state: RootState) =>
    selectUserActivityLastElemIndex(state, DEFAULT_LIMIT),
  );
  const nextPageExists = useSelector((state: RootState) =>
    selectUserActivityNextPageExists(state, DEFAULT_LIMIT),
  );
  useUserActivityFetch({ page: currentPage, limit: DEFAULT_LIMIT });

  const onClickPrevPage = () => {
    setCurrentPage(Number(page) - 1);
  };
  const onClickNextPage = () => {
    setCurrentPage(Number(page) + 1);
  };

  return (
    <>
      <BackButtonMobile to="/profile">{t('page.body.profile.header.account')}</BackButtonMobile>
      <div className="pg-mobile-profile-account-activity-screen">
        <div className="pg-mobile-profile-account-activity-screen__list">
          {userActivity.length ? (
            userActivity.map((item, index) => <UserActivityItem key={index} item={item} />)
          ) : (
            <span className="no-data">{t('page.noDataToShow')}</span>
          )}
          <Pagination
            firstElemIndex={firstElemIndex}
            lastElemIndex={lastElemIndex}
            page={currentPage}
            nextPageExists={nextPageExists}
            onClickPrevPage={onClickPrevPage}
            onClickNextPage={onClickNextPage}
          />
        </div>
      </div>
    </>
  );
};

export const ProfileAccountActivityMobileScreen = React.memo(
  ProfileAccountActivityMobileScreenComponent,
);
