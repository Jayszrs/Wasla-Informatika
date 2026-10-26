import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

await Promise.all([
  loadFont({family: 'Sora', url: staticFile('fonts/sora-latin-700-normal.woff2'), weight: '700'}),
  loadFont({family: 'Sora', url: staticFile('fonts/sora-latin-800-normal.woff2'), weight: '800'}),
  loadFont({family: 'Plus Jakarta Sans', url: staticFile('fonts/plus-jakarta-sans.ttf'), weight: '100 900'}),
  loadFont({family: 'Wasla Wordmark', url: staticFile('fonts/Poppins-SemiBold.ttf'), weight: '600'}),
]);
