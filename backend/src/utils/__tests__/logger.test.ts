import logger from '../logger.js';

describe('Logger', () => {
  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should have log methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });

  it('should log info messages', () => {
    const spy = jest.spyOn(logger, 'info');
    logger.info('Test message');
    expect(spy).toHaveBeenCalledWith('Test message');
    spy.mockRestore();
  });

  it('should log error messages', () => {
    const spy = jest.spyOn(logger, 'error');
    logger.error('Error message');
    expect(spy).toHaveBeenCalledWith('Error message');
    spy.mockRestore();
  });

  it('should log warn messages', () => {
    const spy = jest.spyOn(logger, 'warn');
    logger.warn('Warning message');
    expect(spy).toHaveBeenCalledWith('Warning message');
    spy.mockRestore();
  });

  it('should log debug messages', () => {
    const spy = jest.spyOn(logger, 'debug');
    logger.debug('Debug message');
    expect(spy).toHaveBeenCalledWith('Debug message');
    spy.mockRestore();
  });
});
