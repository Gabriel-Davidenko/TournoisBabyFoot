import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from './tournament.entity';
import { User } from './user.entity';

/**
 * Table de jointure entre les utilisateurs et les tournois
 * Les utlisateurs peuvent avoir une ou plusieurs équipes
 * Par exemple, un utilisateur A peux être dans l'équipe squadA pour un tournois
 * et il peux être dans l'équipe squadB pour un autre tournoi
 */

@Entity()
export class Team {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar' })
	name!: string;

	@ManyToOne(() => User, (user) => user.id)
	users!: User[];

	@ManyToOne(() => Tournament, (tournament) => tournament.team)
	tournaments!: Tournament[];
}
