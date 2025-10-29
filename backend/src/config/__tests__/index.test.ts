import config from '../index.js';

describe('Configuration', () => {
  it('should export a valid configuration object', () => {
    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(Object);
  });

  it('should have required properties', () => {
    expect(config).toHaveProperty('nodeEnv');
    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('databaseUrl');
    expect(config).toHaveProperty('corsOrigin');
    expect(config).toHaveProperty('jwtSecret');
  });

  it('should have valid port number', () => {
    expect(typeof config.port).toBe('number');
    expect(config.port).toBeGreaterThan(0);
    expect(config.port).toBeLessThan(65536);
  });

  it('should have valid nodeEnv', () => {
    expect(['development', 'production', 'test']).toContain(config.nodeEnv);
  });

  it('should have rate limit configuration', () => {
    expect(config).toHaveProperty('rateLimit');
    expect(config.rateLimit).toHaveProperty('windowMs');
    expect(config.rateLimit).toHaveProperty('maxRequests');
    expect(typeof config.rateLimit.windowMs).toBe('number');
    expect(typeof config.rateLimit.maxRequests).toBe('number');
  });

  it('should have jwtSecret', () => {
    expect(config).toHaveProperty('jwtSecret');
    expect(typeof config.jwtSecret).toBe('string');
    expect(config.jwtSecret.length).toBeGreaterThan(0);
  });
});

