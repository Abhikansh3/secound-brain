
export function randomString(length: number): string {
  let options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let lengthOptions = options.length;
  let answer = '';

  for (let i = 0; i < length; i++) {
    answer += options.charAt(Math.floor(Math.random() * lengthOptions));
  }
  return answer;
}
