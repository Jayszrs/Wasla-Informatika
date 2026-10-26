import {Composition} from 'remotion';
import {WaslaCompanyProfile} from './WaslaCompanyProfile';
import {WaslaScrollReel} from './WaslaScrollReel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="WaslaScrollReel" component={WaslaScrollReel} durationInFrames={1050} fps={30} width={1080} height={1920}/>
      <Composition id="WaslaCompanyProfile" component={WaslaCompanyProfile} durationInFrames={1800} fps={30} width={1080} height={1920}/>
    </>
  );
};
