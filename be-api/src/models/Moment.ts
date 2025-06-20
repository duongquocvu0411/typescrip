import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Moments')
export class Moment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  imageurl!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}
