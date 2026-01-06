import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Squad } from './squad';

/**
 * Les administrateurs et les joueurs sont des utilisateur
 */
@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	/** nom à afficher */
	@Column({ type: 'varchar' })
	name!: string;

	/** login de connexion  */
	@Column({ type: 'varchar' })
	username!: string;

	@Column({ type: 'varchar' })
	password!: string;

	@Column({ type: 'varchar' })
	salt!: string;

	@OneToMany(() => Squad, (squad) => squad.users)
	squads!: Squad[];
}
