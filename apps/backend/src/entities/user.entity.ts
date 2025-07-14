import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
