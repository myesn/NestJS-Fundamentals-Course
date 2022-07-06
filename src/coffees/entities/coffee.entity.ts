import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // 关系所有者端才需要加这个修饰符，即主表要加，外表不加
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // boolean | ("insert" | "update" | "remove" | "soft-remove" | "recover")[];
  })
  flavors: Flavor[];
}
