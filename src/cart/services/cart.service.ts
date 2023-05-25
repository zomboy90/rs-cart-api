import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from 'src/database/entities';
import { Status } from 'src/database/entities/cart';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly userCarts: Repository<Cart>,
  ) {}

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

  createByUserId(userId: string) {
    const userCart = {
      id: uuidv4(),
      items: [],
      userId: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: Status.Open
    };

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.userCarts.findOne({
      where: {
        userId
      }
    });

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
