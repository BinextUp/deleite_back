import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: process.env.SUPABASE_BASE_DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
    }),
  );