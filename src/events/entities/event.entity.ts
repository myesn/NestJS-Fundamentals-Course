import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type']) // 添加多列索引时，将修饰符应用于类上，然后传入需要添加索引的所有列名
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  //@Index() // 添加单列索引时，将修饰符应用于具体的属性上
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>; // Record 采用 Record<K, T> 的形式，其中 K 是键的类型，T 是值的类型。https://fjolt.com/article/typescript-record-type
}
