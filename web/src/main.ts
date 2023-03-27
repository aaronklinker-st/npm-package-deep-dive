import "./style.css";
import { getContributors, Contributor } from "@aklinker1/github-contributors";

const app = document.querySelector<HTMLDivElement>("#app")!;

const listItem = (contributor: Contributor) => `
  <li>
    <img src="${contributor.avatarUrl}" />
    <a href="${contributor.profileUrl}" target="_blank">${contributor.username}</a>
  </li>
`;

async function render() {
  const contributors = await getContributors({
    owner: "denoland",
    repo: "deno",
  });

  app.innerHTML = `<ul>
    ${contributors.map(listItem).join("")}
  </ul>`;
}

render();
