import { IsString } from 'class-validator';

// 创建 coffee 的数据模型
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly brand: string;

  // each: true 表示期望值是一个字符串数组
  @IsString({ each: true })
  readonly flavors: string[];
}
