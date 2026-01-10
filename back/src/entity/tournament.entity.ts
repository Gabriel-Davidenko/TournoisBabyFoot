import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Team } from './team';

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

	@OneToMany(() => Team, (team) => team.tournaments)
	team!: Team[];
}
