import React from 'react';

import { Mousewheel, Pagination, Swiper as SwiperInterface } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import TodayDate from 'components/TodayDate';
import { Survey } from 'types/survey';

import SurveyItem from './SurveyItem';

export interface SurveyListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSlideChange: (swiper: SwiperInterface) => void;
  surveys: Survey[];
}

const SurveyList = ({ surveys, onSlideChange }: SurveyListProps) => {
  return (
    <>
      <div className="today-container">
        <TodayDate />
      </div>
      <div className="survey-list-container">
        <Swiper
          slidesPerView={1}
          modules={[Mousewheel, Pagination]}
          navigation
          speed={850}
          pagination={{
            clickable: true,
            // el: '.swiper-pagination',
            // bulletClass: `swiper-pagination-bullet swiper-pagination-test`,
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
      </div>
    </>
  );
};

export default SurveyList;
