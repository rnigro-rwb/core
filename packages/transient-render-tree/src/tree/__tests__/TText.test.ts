import { TText } from '../TText';
import { defaultInit } from './shared';

describe('TText class', () => {
  describe('trimLeft method', () => {
    it('should remove the first character', () => {
      const text = new TText({
        data: ' This is Great',
        ...defaultInit
      });
      text.trimLeft();
      expect(text.data).toBe('This is Great');
    });
  });
  describe('trimRight method', () => {
    it('should remove the last character', () => {
      const text = new TText({
        data: 'This is Great ',
        ...defaultInit
      });
      text.trimRight();
      expect(text.data).toBe('This is Great');
    });
  });
});
