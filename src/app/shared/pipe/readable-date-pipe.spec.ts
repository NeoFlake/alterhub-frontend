import { ReadableDatePipe } from './readable-date-pipe';

describe('ReadableDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableDatePipe();
    expect(pipe).toBeTruthy();
  });
});
