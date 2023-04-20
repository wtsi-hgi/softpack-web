export type Status = 'completed' | 'pending' | 'failed';

export interface EnvironmentStatus {
  id: string;
  name: string;
  description: string;
  status: Status;
  dateCreated: string;
  owner: string;
}