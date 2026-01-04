import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum StatusEnum {
	PENDING = 'pending',
	ACTIVE = 'active',
	FINISHED = 'finished',
}
@Entity()
export class Tournament {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar' })
	name!: string;

	@Column({ type: 'varchar' })
	description!: string;

	@Column({ type: 'date' })
	date!: Date;

	@Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
	status!: StatusEnum;

	@Column({ type: 'uuid' })
	createdBy!: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
