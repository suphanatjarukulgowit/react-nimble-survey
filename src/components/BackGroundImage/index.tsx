import React from 'react';

export const backgroundImageTestIds = {
  backgroundImage: 'background-image',
};

export interface BackgroundImageProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string | null;
}

const BackgroundImage = ({ imageUrl, ...props }: BackgroundImageProps) => {
  return (
    <div className="background-image" data-test-id={backgroundImageTestIds.backgroundImage} {...props}>
      {imageUrl ? <img src={imageUrl} alt="background" /> : <img src="" alt="background" />}
    </div>
  );
};

export default BackgroundImage;
