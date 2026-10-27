import {Composition} from 'remotion';
import {WaslaCompanyProfile} from './WaslaCompanyProfile';
import {WaslaScrollReel} from './WaslaScrollReel';
import {WaslaMotionReel} from './WaslaMotionReel';
import {WaslaSalesReel} from './WaslaSalesReel';
import {WaslaGeometricReel} from './WaslaGeometricReel';
import {WaslaLandscapePromo} from './WaslaLandscapePromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="WaslaLandscapePromo" component={WaslaLandscapePromo} durationInFrames={1656} fps={60} width={1920} height={1080}/>
      <Composition id="WaslaGeometricReel" component={WaslaGeometricReel} durationInFrames={270} fps={30} width={1080} height={1920}/>
      <Composition id="WaslaSalesReel" component={WaslaSalesReel} durationInFrames={450} fps={30} width={1080} height={1920}/>
      <Composition id="WaslaMotionReel" component={WaslaMotionReel} durationInFrames={900} fps={30} width={1080} height={1920}/>
      <Composition id="WaslaScrollReel" component={WaslaScrollReel} durationInFrames={1050} fps={30} width={1080} height={1920}/>
      <Composition id="WaslaCompanyProfile" component={WaslaCompanyProfile} durationInFrames={1800} fps={30} width={1080} height={1920}/>
    </>
  );
};
