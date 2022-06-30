//import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() // 将属性标记为可选参数，当字段缺失或值为 undefined 时不会抛错
  @IsPositive() // 验证值是否为正数，即大于 0
  //@Type(() => Number) // 显示指定字段的类型，确保传入的值被解析为 number 类型，也可以在 main.ts 中启用全局隐式转换，那样就不用再写这个修饰符了
  limit: number;

  @IsOptional()
  @IsPositive()
  //@Type(() => Number)
  offset: number;
}
