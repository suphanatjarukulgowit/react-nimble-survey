import React from 'react';

import { Mousewheel, Pagination, Swiper as SwiperInterface } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css';

import TodayDate from 'components/TodayDate';
import { Survey } from 'types/survey';

import SurveyItem from './SurveyItem';
import styles from './SurveyList.module.css';
export interface SurveyListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSlideChange?: (swiper: SwiperInterface) => void;
  surveys: Survey[];
}

const surveyListDataTestIds = {
  surveyListContainer: 'surveyListContainer',
  todayContainer: 'todayContainer',
};

const SurveyList = ({ surveys, onSlideChange }: SurveyListProps) => {
  return (
    <>
      <div data-test-id={surveyListDataTestIds.todayContainer} className="today-container">
        <TodayDate />
      </div>
      <div data-test-id={surveyListDataTestIds.surveyListContainer} className="survey-list-container">
        <Swiper
          slidesPerView={1}
          modules={[Mousewheel, Pagination]}
          speed={750}
          pagination={{
            clickable: true,
            type: 'bullets',
            el: '.swiper-pagination',
            bulletClass: `swiper-pagination-bullet ${styles.swiperPaginationBullet}`,
          }}
          className="swiper"
          onSlideChange={onSlideChange}
        >
          {surveys.map((survey) => (
            <SwiperSlide className="swiper-slide" key={survey.attributes.id}>
              <SurveyItem survey={survey} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.swiperPaginationContainer}>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </>
  );
};

export default SurveyList;
