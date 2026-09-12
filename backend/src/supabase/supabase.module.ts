import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase.constants';

@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseKey) {
          console.warn('⚠️ Supabase credentials not found. File upload will not work.');
          return null;
        }

        return createClient(supabaseUrl, supabaseKey);
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
