import { describe, expect, it } from 'vitest';
import { parseAllowedOrigin, parsePort } from './server-config';

describe('parsePort', () => {
  it('lässt einen fehlenden Port bei Astros Vorgabe', () => {
    expect(parsePort(undefined)).toBeUndefined();
    expect(parsePort('  ')).toBeUndefined();
  });

  it('liest einen gültigen Port', () => {
    expect(parsePort('4610')).toBe(4610);
    expect(parsePort(' 65535 ')).toBe(65_535);
  });

  it.each(['0', '65536', '-1', '46.10', '4610abc', '1e3', '0x10'])('weist „%s“ ab', (value) => {
    expect(() => parsePort(value)).toThrow('PORT muss');
  });
});

describe('parseAllowedOrigin', () => {
  it('gibt ohne Wert keine Freigabe', () => {
    expect(parseAllowedOrigin(undefined)).toBeUndefined();
    expect(parseAllowedOrigin('')).toBeUndefined();
  });

  it('nimmt https an, wenn das Schema fehlt', () => {
    expect(parseAllowedOrigin('verein.example')).toEqual({
      hostname: 'verein.example',
      protocol: 'https',
    });
  });

  it('übernimmt Schema und Port', () => {
    expect(parseAllowedOrigin('http://localhost:4610')).toEqual({
      hostname: 'localhost',
      protocol: 'http',
      port: '4610',
    });
  });

  it.each([
    'https://verein.example/pfad',
    'https://verein.example/?a=1',
    'https://verein.example/#anker',
    'https://user:pass@verein.example',
    'ftp://verein.example',
    'http://',
  ])('weist „%s“ ab', (value) => {
    expect(() => parseAllowedOrigin(value)).toThrow('ASTRO_ALLOWED_ORIGIN');
  });
});
