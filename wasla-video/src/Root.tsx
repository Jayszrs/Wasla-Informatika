import {Composition} from 'remotion';
import {WaslaCompanyProfile} from './WaslaCompanyProfile';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="WaslaCompanyProfile" component={WaslaCompanyProfile} durationInFrames={1800} fps={30} width={1080} height={1920}/>
    </>
  );
};
