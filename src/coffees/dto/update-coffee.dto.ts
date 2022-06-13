import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// 修改 coffee 的数据模型
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
