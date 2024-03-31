"use server";

import HomePage from "@/lib/local/components/pages/HomePage";

export default async function Home() {
  const apiUrl = process.env.GITHUB_API_REPOSITORY_URL;
  let result: Parameters<typeof HomePage>[0]["welcome"];

  if (!apiUrl) {
    console.error("Github API repository does not exists!");

    result = {
      forks: 0,
      lastUpdateAt: new Date().toDateString(),
      stars: 0,
    };
  } else {
    try {
      const response = await fetch(apiUrl, {
        next: {
          // Revalidate response after 60 seconds
          revalidate: 60,
        },
      });

      if (!response.ok) {
        console.error("Error trying to reading repository statistics!");

        result = {
          forks: 0,
          lastUpdateAt: new Date().toDateString(),
          stars: 0,
        };
        console.error("Error trying to reading repository statistics!");

        result = {
          forks: 0,
          lastUpdateAt: new Date().toDateString(),
          stars: 0,
        };
      } else {
        const data = await response.json();

        result = {
          stars: data.stargazers_count,
          forks: data.forks_count,
          lastUpdateAt: new Date(data.updated_at).toDateString(),
        };
      }
    } catch (e) {
      console.error(e);

      result = {
        forks: 0,
        lastUpdateAt: new Date().toDateString(),
        stars: 0,
      };
    }
  }

  return <HomePage welcome={result} />;
}
