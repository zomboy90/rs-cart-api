import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item';

export enum Status {
  Ordered = 'ORDERED',
  Open = 'OPEN'
}

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'text' })
  userId: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'date' })
  updatedAt: Date;

  @Column({ enum: Status })
  status: Status;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}
