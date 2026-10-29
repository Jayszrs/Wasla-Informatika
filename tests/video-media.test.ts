import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseVideoSource, videoMimeType, maxVideoBytes } from '../src/shared/video-source'
import { mediaByteRange } from '../src/backend/media-range'
import { validateDocument } from '../src/backend/content-validation'

test('video sources require individual media and trusted HTTPS providers', () => {
  assert.equal(parseVideoSource('https://youtu.be/K0dGYfzaAX0?si=share')?.id, 'K0dGYfzaAX0')
  assert.equal(parseVideoSource('https://www.tiktok.com/@jayszrss/video/7508283130906725649')?.portrait, true)
  assert.equal(parseVideoSource('https://www.instagram.com/reel/Example_123/')?.provider, 'instagram')
  assert.equal(parseVideoSource('https://drive.google.com/file/d/1Vtk5hSiIk9hXtsa2feURucZyPy4DLxri/view')?.provider, 'drive')
  for (const input of ['https://youtube.com/@fuldayy', 'https://www.instagram.com/growthfin.id/', 'https://www.tiktok.com/@jayszrss', 'https://youtube.com.evil.invalid/watch?v=K0dGYfzaAX0', 'http://youtu.be/K0dGYfzaAX0', 'https://user:password@youtu.be/K0dGYfzaAX0', 'https://127.0.0.1/file.mp4']) assert.equal(parseVideoSource(input), null)
})

test('video byte ranges support seeking and reject malformed or unsatisfiable ranges', () => {
  assert.equal(mediaByteRange(null, 100), null)
  assert.deepEqual(mediaByteRange('bytes=0-9', 100), { start: 0, end: 9 })
  assert.deepEqual(mediaByteRange('bytes=90-', 100), { start: 90, end: 99 })
  assert.deepEqual(mediaByteRange('bytes=-20', 100), { start: 80, end: 99 })
  assert.deepEqual(mediaByteRange('bytes=90-200', 100), { start: 90, end: 99 })
  for (const range of ['bytes=100-', 'bytes=20-10', 'bytes=-0', 'bytes=-', 'bytes=1-2,3-4', 'bytes=9007199254740992-']) assert.equal(mediaByteRange(range, 100), 'invalid')
})

test('uploads check file signatures instead of trusting a renamed file', () => {
  assert.equal(videoMimeType(Buffer.from('000000006674797069736f6d', 'hex')), 'video/mp4')
  assert.equal(videoMimeType(Buffer.from('1a45dfa3', 'hex')), 'video/webm')
  assert.equal(videoMimeType(Buffer.from('<script>renamed.mp4</script>')), null)
  assert.equal(maxVideoBytes, 262144000)
})

test('CMS video validation accepts native replacements and rejects account links', () => {
  const base = { title: 'Film', slug: 'film', category: 'Film drama', channel: 'Pilihan', provider: 'youtube', _status: 'draft' }
  assert.ok(validateDocument('video-projects', { ...base, sourceURL: 'https://youtube.com/@fuldayy' }).error)
  assert.ok(validateDocument('video-projects', { ...base, sourceURL: 'https://www.instagram.com/reel/Example_123/' }).error)
  assert.equal(validateDocument('video-projects', { ...base, sourceURL: 'https://youtu.be/K0dGYfzaAX0', video: 123 }).error, undefined)
  assert.ok(validateDocument('video-projects', { ...base, provider: 'upload' }).error)
  assert.equal(validateDocument('video-projects', { ...base, provider: 'upload', video: 123 }).error, undefined)
  assert.ok(validateDocument('video-projects', { ...base, provider: 'upload', video: 123, sourceURL: 'javascript:alert(1)' }).error)
  assert.ok(validateDocument('video-projects', { ...base, provider: 'upload', video: 123, sourceURL: 'https://user:pass@example.com/source' }).error)
  assert.equal(validateDocument('video-projects', { ...base, mediaType: 'image', provider: 'upload', thumbnail: 123 }).error, undefined)
  assert.ok(validateDocument('video-projects', { ...base, mediaType: 'image', provider: 'upload' }).error)
})
