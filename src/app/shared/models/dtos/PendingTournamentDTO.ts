import {TournamentDTO} from './TournamentDTO';

export class PendingTournamentDTO {
  tournamentId: number;
  users: TournamentDTO[];
  date: Date;
}
