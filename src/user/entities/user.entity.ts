import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as argon2 from 'argon2';

@Entity('users')
export class User extends BaseEntity {
  constructor(dto: Partial<User> = {}) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('uuid')
  public readonly id!: number;

  @Column({ unique: true, type: 'varchar', length: 36 })
  public readonly username!: string;

  @Column({ unique: true, type: 'varchar', length: 80 })
  public email!: string;

  @Column({ type: 'varchar', length: 160 })
  @Exclude()
  public password!: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin?: boolean;

  @Column({ name: 'is_ambassador', default: true })
  isAmbassador?: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date().toUTCString() })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: new Date().toUTCString() })
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async comparePassword(passwordTxt: string): Promise<boolean> {
    return await argon2.verify(this.password, passwordTxt);
  }
}
