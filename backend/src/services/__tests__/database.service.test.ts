import DatabaseService from '../database.service.js';
import { PrismaClient } from '@prisma/client';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $queryRaw: jest.fn(),
    $on: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock logger
jest.mock('../../utils/logger.js', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('DatabaseService', () => {
  let mockPrismaClient: PrismaClient;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset the singleton instance
    // @ts-expect-error - accessing private static property for testing
    DatabaseService.instance = undefined;
    
    // Get a fresh mock instance
    mockPrismaClient = new PrismaClient();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance on multiple calls', () => {
      const instance1 = DatabaseService.getInstance();
      const instance2 = DatabaseService.getInstance();

      expect(instance1).toBe(instance2);
      expect(instance1).toBeInstanceOf(DatabaseService);
    });

    it('should create only one PrismaClient instance', () => {
      const PrismaClientConstructor = PrismaClient as jest.MockedClass<typeof PrismaClient>;
      
      // Clear previous calls
      PrismaClientConstructor.mockClear();
      
      // Reset singleton
      // @ts-expect-error - accessing private static property for testing
      DatabaseService.instance = undefined;
      
      DatabaseService.getInstance();
      DatabaseService.getInstance();
      DatabaseService.getInstance();

      // Should be called only once for the singleton
      expect(PrismaClientConstructor).toHaveBeenCalledTimes(1);
    });
  });

  describe('getClient', () => {
    it('should return the Prisma client instance', () => {
      const service = DatabaseService.getInstance();
      const client = service.getClient();

      expect(client).toBeDefined();
      expect(client).toBe(mockPrismaClient);
    });
  });

  describe('connect', () => {
    it('should connect to database successfully', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$connect as jest.Mock).mockResolvedValue(undefined);

      await service.connect();

      expect(mockPrismaClient.$connect).toHaveBeenCalledTimes(1);
    });

    it('should handle connection errors', async () => {
      const service = DatabaseService.getInstance();
      const error = new Error('Connection failed');
      (mockPrismaClient.$connect as jest.Mock).mockRejectedValue(error);

      await expect(service.connect()).rejects.toThrow();
      expect(mockPrismaClient.$connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('disconnect', () => {
    it('should disconnect from database successfully', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$disconnect as jest.Mock).mockResolvedValue(undefined);

      await service.disconnect();

      expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
    });

    it('should handle disconnection errors', async () => {
      const service = DatabaseService.getInstance();
      const error = new Error('Disconnection failed');
      (mockPrismaClient.$disconnect as jest.Mock).mockRejectedValue(error);

      await expect(service.disconnect()).rejects.toThrow();
      expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
    });
  });

  describe('healthCheck', () => {
    it('should return true when database is healthy', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$queryRaw as jest.Mock).mockResolvedValue([{ '?column?': 1 }]);

      const result = await service.healthCheck();

      expect(result).toBe(true);
      expect(mockPrismaClient.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('should return false when database query fails', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$queryRaw as jest.Mock).mockRejectedValue(new Error('Query failed'));

      const result = await service.healthCheck();

      expect(result).toBe(false);
      expect(mockPrismaClient.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('should return false when database connection is lost', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$queryRaw as jest.Mock).mockRejectedValue(new Error('Connection lost'));

      const result = await service.healthCheck();

      expect(result).toBe(false);
    });
  });

  describe('Event Handlers', () => {
    it('should register query event handler in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      // Reset singleton to trigger constructor
      // @ts-expect-error - accessing private static property for testing
      DatabaseService.instance = undefined;

      DatabaseService.getInstance();

      // Verify $on was called for query events
      expect(mockPrismaClient.$on).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('should register error event handler', () => {
      // Reset singleton to trigger constructor
      // @ts-expect-error - accessing private static property for testing
      DatabaseService.instance = undefined;

      DatabaseService.getInstance();

      // Verify $on was called (for error handler)
      expect(mockPrismaClient.$on).toHaveBeenCalled();
    });

    it('should register warn event handler', () => {
      // Reset singleton to trigger constructor
      // @ts-expect-error - accessing private static property for testing
      DatabaseService.instance = undefined;

      DatabaseService.getInstance();

      // Verify $on was called (for warn handler)
      expect(mockPrismaClient.$on).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle connection errors gracefully', async () => {
      const service = DatabaseService.getInstance();
      const connectionError = new Error('ECONNREFUSED');
      (mockPrismaClient.$connect as jest.Mock).mockRejectedValue(connectionError);

      await expect(service.connect()).rejects.toThrow();
    });

    it('should handle query errors in health check', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$queryRaw as jest.Mock).mockRejectedValue(new Error('Query timeout'));

      const result = await service.healthCheck();

      expect(result).toBe(false);
    });
  });

  describe('Multiple Operations', () => {
    it('should handle connect and disconnect sequence', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$connect as jest.Mock).mockResolvedValue(undefined);
      (mockPrismaClient.$disconnect as jest.Mock).mockResolvedValue(undefined);

      await service.connect();
      await service.disconnect();

      expect(mockPrismaClient.$connect).toHaveBeenCalledTimes(1);
      expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple health checks', async () => {
      const service = DatabaseService.getInstance();
      (mockPrismaClient.$queryRaw as jest.Mock).mockResolvedValue([{ '?column?': 1 }]);

      await service.healthCheck();
      await service.healthCheck();
      await service.healthCheck();

      expect(mockPrismaClient.$queryRaw).toHaveBeenCalledTimes(3);
    });

    it('should handle disconnect errors', async () => {
      const service = DatabaseService.getInstance();
      const disconnectError = new Error('Disconnect failed');
      (mockPrismaClient.$disconnect as jest.Mock).mockRejectedValue(disconnectError);

      await expect(service.disconnect()).rejects.toThrow('Disconnect failed');
    });

    it('should return prisma client instance', () => {
      const service = DatabaseService.getInstance();
      const client = service.getClient();

      expect(client).toBe(mockPrismaClient);
    });
  });
});
