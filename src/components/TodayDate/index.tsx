import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import i18next from 'i18next';

export const todayDateTestIds = {
  date: 'today-date__date',
  title: 'today-date__title',
};

const weekdayFormat: Intl.DateTimeFormatOptions = { weekday: 'long' };
const monthFormat: Intl.DateTimeFormatOptions = { month: 'long' };

export type TodayDateProps = React.HTMLAttributes<HTMLDivElement>;

const TodayDate = ({ ...props }: TodayDateProps) => {
  const currentLocale = i18next.language;
  const { t } = useTranslation();

  const today = new Date();
  const weekday = today.toLocaleDateString(currentLocale, weekdayFormat);
  const month = today.toLocaleDateString(currentLocale, monthFormat);
  const date = today.getDate();

  return (
    <div className={classNames('today-date')} {...props}>
      <div className="today-date__date" data-test-id={todayDateTestIds.date}>
        {`${weekday}, ${month} ${date}`}
      </div>
      <div className="today-date__title" data-test-id={todayDateTestIds.title}>
        {t('survey.today')}
      </div>
    </div>
  );
};

export default TodayDate;
