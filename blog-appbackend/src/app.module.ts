import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import typeOrmconfig from 'typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { BloggerModule } from './blogger/blogger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmconfig),
    AuthModule,
    UserModule,
    AdminModule,
    BloggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
