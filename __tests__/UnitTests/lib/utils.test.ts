import { cn, roundIfNumber, convertDateToString, getErrorMessage, PRICE_ID } from '@/lib/utils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

jest.mock('clsx');
jest.mock('tailwind-merge');

describe('Utils functions', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('cn', () => {
    it('should merge class names correctly', () => {
      const classNames = ['class1', 'class2'];
      (clsx as jest.Mock).mockReturnValue('clsx-output');
      (twMerge as jest.Mock).mockReturnValue('twMerge-output');

      const result = cn(...classNames);

      expect(clsx).toHaveBeenCalledWith(classNames);
      expect(twMerge).toHaveBeenCalledWith('clsx-output');
      expect(result).toBe('twMerge-output');
    });
  });

  describe('roundIfNumber', () => {
    it('should round a number to two decimal places', () => {
      expect(roundIfNumber(12.3456)).toBe(12.35);
    });

    it('should round a string representation of a number to two decimal places', () => {
      expect(roundIfNumber('12.3456')).toBe(12.35);
    });

    it('should return the original value if it is null', () => {
      expect(roundIfNumber(null)).toBeNull();
    });

    it('should return the original value if it is not a number or a string', () => {
      expect(roundIfNumber('not a number')).toBeNaN();
    });
  });

  describe('convertDateToString', () => {
    it('should convert a date to a formatted string', () => {
      const date = new Date('2023-08-05T00:00:00Z');
      expect(convertDateToString(date)).toBe('2023/8/6');
    });
  });

  describe('getErrorMessage', () => {
    it('should return the error message if it is an instance of Error and less than 100 characters', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });

    it('should return the default message if error message is more than 100 characters', () => {
      const error = new Error('a'.repeat(101));
      expect(getErrorMessage(error)).toBe('Something went wrong');
    });

    it('should return the default message if error is not an instance of Error', () => {
      const error = 'Test error message';
      expect(getErrorMessage(error)).toBe('Something went wrong');
    });

    it('should log the error to console', () => {
      const error = new Error('Test error message');
      getErrorMessage(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('PRICE_ID', () => {
    it('should have the correct value', () => {
      expect(PRICE_ID).toBe('price_1Pda01JOxUcx6jSsHcgEYBFK');
    });
  });
});
