import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // 确保在创建 Coffee 之前，所有的 Flavor 都已存在数据库中，并配合 Promise.all 等待所有的 Flavor 都创建完毕
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // 确保在修改 Coffee 之前，所有的 Flavor 都已存在数据库中，并配合 Promise.all 等待所有的 Flavor 都创建完毕
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    /**
     * preload:
     *  从给定的普通JavaScript对象中创建一个新的实体。如果实体在数据库中已经存在，那么它会加载它（以及与之相关的一切），
     *  用给定对象中的新值替换所有值，并返回这个新实体。这个新实体实际上是从数据库中加载的实体，所有的属性都是从新对象中替换的。
     *
     *  注意：给定的类实体对象必须有一个实体ID/主键来查找实体。如果没有找到给定ID的实体，则返回未定义。
     */
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
