import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'Participants' })
export class Participant {
  @PrimaryGeneratedColumn({ name: 'Id' })  // map cột DB "Id"
  id!: number;

  @Column({ name: 'Name', nullable: true, type: 'text' })  // map cột DB "Name"
  name!: string | null;

  @Column({ name: 'Message', nullable: true, type: 'text' })  // map cột DB "Message"
  message!: string | null;

  @CreateDateColumn({ name: 'CreatedAt', type: 'timestamptz' })  // map cột DB "CreatedAt"
  createdAt!: Date;
}
