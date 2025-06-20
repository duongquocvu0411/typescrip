import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DanhMuc {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ten!: string;
}
