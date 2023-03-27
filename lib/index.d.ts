export interface Contributor {
  username: string;
  profileUrl: string;
  avatarUrl: string;
}

export function getContributors(options: { owner: string; repo: string }): Promise<Contributor[]>;
