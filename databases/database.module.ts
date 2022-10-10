import { Module } from '@nestjs/common';
import { nimbusRateDatabaseProviders } from './nimbus-rate/database.provider';
import { nimbusAffilateDatabaseProviders } from './nimbus-affilate/database.provider';
import { nimbusEventsDatabaseProviders } from './nimbus-events/database.provider';

@Module({
  providers: [
    ...nimbusRateDatabaseProviders,
    ...nimbusEventsDatabaseProviders,
    // ...nimbusAffilateDatabaseProviders,
  ],
  exports: [
    ...nimbusRateDatabaseProviders,
    ...nimbusEventsDatabaseProviders,
    // ...nimbusAffilateDatabaseProviders,
  ],
})
export class DatabaseModule {}
