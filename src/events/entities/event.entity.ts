import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>; // Record 采用 Record<K, T> 的形式，其中 K 是键的类型，T 是值的类型。https://fjolt.com/article/typescript-record-type
}
