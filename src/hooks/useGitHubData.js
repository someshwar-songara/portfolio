import { useState, useEffect } from 'react';
import initialRepos from '../data/githubCache.json';
import initialProfile from '../data/githubProfileCache.json';
import { curatedMap, customProjects, paletteCycle, defaultProjects } from '../data/projects';

const GITHUB_USERNAME = 'someshwar-songara';

function processRepos(githubRepos) {
  if (!Array.isArray(githubRepos) || githubRepos.length === 0) {
    return defaultProjects;
  }

  const projects = [];
  let index = 0;

  for (const repo of githubRepos) {
    const repoName = repo.name || '';
    if (repoName.toLowerCase() === GITHUB_USERNAME.toLowerCase() || repo.fork) {
      continue;
    }

    const palette = paletteCycle[index % paletteCycle.length];
    index++;

    const curated = curatedMap[repoName] || null;
    const primaryLang = repo.language || '';
    const techStack = curated?.tech || (primaryLang ? [primaryLang] : ['Code']);
    const demo = repo.homepage || curated?.demo_url || null;

    projects.push({
      name: curated?.name || repoName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: curated?.description || repo.description || 'Open-source project built and maintained on GitHub.',
      tech: techStack,
      tag: curated?.tag || (primaryLang ? `${primaryLang} Repo` : 'GitHub Repo'),
      emoji: curated?.emoji || '⚡',
      color: curated?.color || palette.color,
      pin_color: curated?.pin_color || palette.pin_color,
      rotate: curated?.rotate || palette.rotate,
      github_url: repo.html_url || `https://github.com/${GITHUB_USERNAME}/${repoName}`,
      demo_url: demo,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      year: repo.updated_at ? repo.updated_at.substring(0, 4) : new Date().getFullYear().toString(),
      is_dynamic: true,
    });
  }

  // Append curated projects that are not yet repositories on GitHub
  for (const custom of customProjects) {
    projects.push(custom);
  }

  return projects;
}

export function useGitHubData() {
  const [profile, setProfile] = useState(() => ({
    public_repos: initialProfile?.public_repos ?? 5,
    followers: initialProfile?.followers ?? 1,
    following: initialProfile?.following ?? 1,
    bio: initialProfile?.bio ?? 'B.Tech CSE Student | Web & Android Development',
    avatar_url: '/avatar.jpg',
    html_url: initialProfile?.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
  }));

  const [projects, setProjects] = useState(() => processRepos(initialRepos));

  useEffect(() => {
    let isMounted = true;

    // Defer live GitHub sync until initial paint, hydration, and idle time
    const timer = setTimeout(() => {
      const runSync = () => {
        // Fetch user profile
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
          .then(res => (res.ok ? res.json() : null))
          .then(data => {
            if (isMounted && data && !data.message) {
              setProfile({
                public_repos: data.public_repos ?? 5,
                followers: data.followers ?? 1,
                following: data.following ?? 1,
                bio: data.bio ?? '',
                avatar_url: '/avatar.jpg',
                html_url: data.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
              });
            }
          })
          .catch(() => {});

        // Fetch repositories
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`)
          .then(res => (res.ok ? res.json() : null))
          .then(repos => {
            if (isMounted && Array.isArray(repos) && !repos.message) {
              setProjects(processRepos(repos));
            }
          })
          .catch(() => {});
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(runSync);
      } else {
        runSync();
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { profile, projects };
}
