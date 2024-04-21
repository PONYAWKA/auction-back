import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CoreModule } from './modules/core.module';

@Module({
  imports: [DatabaseModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
