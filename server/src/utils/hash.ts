import * as CryptoJS from 'crypto-js';

export function hashData(data: string): string {
  return CryptoJS.SHA256(data.toLowerCase()).toString(CryptoJS.enc.Hex);
}