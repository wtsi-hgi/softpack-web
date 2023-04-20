export type Status = 'Completed' | 'Pending' | 'Failed';

export interface EnvironmentStatus {
  id: string;
  name: string;
  description: string;
  status: Status;
  dateCreated: string;
  owner: string;
}