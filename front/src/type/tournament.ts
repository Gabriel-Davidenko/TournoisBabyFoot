export type Tournament = { id: string; name: string; description: string; date: Date };

export type AddTournament = Omit<Tournament, 'id' | 'date'> & { date: string };
