import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  /**
   * providers: [
   *  {
   *    provide: CoffeesService,   // Injection token
   *    useClass: CoffeesService,  // Type (class name) of provider (instance to be injected).
   *  }
   * ]
   */
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe'],
    },
  ], // 注入到 IOC 容器
  exports: [CoffeesService], // 导出为本模块的公共 Provider，即可以被其他模块解析使用
})
export class CoffeesModule {}
