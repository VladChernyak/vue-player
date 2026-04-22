import { describe, expect, it } from 'vitest'
import { formatTime, parseTimecode } from '../../src/utils/time'

describe('formatTime', () => {
  it('formats seconds under a minute', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(9)).toBe('0:09')
    expect(formatTime(59)).toBe('0:59')
  })

  it('formats minutes and seconds', () => {
    expect(formatTime(60)).toBe('1:00')
    expect(formatTime(83)).toBe('1:23')
    expect(formatTime(3599)).toBe('59:59')
  })

  it('formats hours', () => {
    expect(formatTime(3600)).toBe('1:00:00')
    expect(formatTime(3661)).toBe('1:01:01')
    expect(formatTime(36000)).toBe('10:00:00')
  })

  it('handles invalid input', () => {
    expect(formatTime(-1)).toBe('0:00')
    expect(formatTime(Infinity)).toBe('0:00')
    expect(formatTime(NaN)).toBe('0:00')
  })
})

describe('parseTimecode', () => {
  it('parses mm:ss', () => {
    expect(parseTimecode('1:23')).toBe(83)
    expect(parseTimecode('0:00')).toBe(0)
    expect(parseTimecode('59:59')).toBe(3599)
  })

  it('parses hh:mm:ss', () => {
    expect(parseTimecode('1:00:00')).toBe(3600)
    expect(parseTimecode('1:01:01')).toBe(3661)
  })

  it('parses plain seconds', () => {
    expect(parseTimecode('42')).toBe(42)
  })

  it('returns 0 for invalid input', () => {
    expect(parseTimecode('abc')).toBe(0)
    expect(parseTimecode('1:xx')).toBe(0)
  })
})
