import { getContributors } from "@aklinker1/github-contributors";
import asciify from "asciify-image";

async function main() {
  console.log("\nLoading...\n");
  const contributors = await getContributors({ owner: "denoland", repo: "deno" });

  const images = await Promise.all(
    contributors.map(({ avatarUrl }) => asciify(avatarUrl, { fit: "box", width: 20 }))
  );

  for (let i = 0; i < contributors.length; i++) {
    const { username, profileUrl } = contributors[i];
    console.log(`\x1b[1m${username}\x1b[0m - \x1b[2m${profileUrl}\x1b[0m`);
    console.log(images[i], "\n");
  }
}

main();
