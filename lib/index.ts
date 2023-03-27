import { ofetch } from "ofetch";

export interface Contributor {
  username: string;
  profileUrl: string;
  avatarUrl: string;
}

/**
 * Returns the username, profile url, and avatar URL for all contributors of a repo.
 */
export async function getContributors(options: {
  owner: string;
  repo: string;
}): Promise<Contributor[]> {
  const { owner, repo } = options;
  const res = await ofetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);

  return res.map((user) => ({
    username: user.login,
    profileUrl: user.html_url,
    avatarUrl: user.avatar_url,
  }));
}
