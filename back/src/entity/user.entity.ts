import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Squad } from './squad';

/**
 * Les administrateurs et les joueurs sont des utilisateur
 */
@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar' })
	name!: string;

	@OneToMany(() => Squad, (squad) => squad.users)
	squad!: Squad;
}
