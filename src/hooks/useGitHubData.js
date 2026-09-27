import { useState, useEffect, useCallback, useRef } from 'react';
import initialRepos from '../data/githubCache.json';
import initialProfile from '../data/githubProfileCache.json';
import {
  curatedMap,
  customProjects,
  paletteCycle,
  defaultProjects,
  findCuratedProject,
  getProjectEmoji,
  normalizeProjectKey,
  sortProjects,
} from '../data/projects';

const GITHUB_USERNAME = 'someshwar-songara';
const STORAGE_KEY = 'somesh_portfolio_gh_v2';

function processRepos(githubRepos) {
  const projects = [];
  const existingKeys = new Set();
  let index = 0;

  if (Array.isArray(githubRepos)) {
    for (const repo of githubRepos) {
      const repoName = repo.name || '';
      if (repoName.toLowerCase() === GITHUB_USERNAME.toLowerCase() || repo.fork) {
        continue;
      }

      const palette = paletteCycle[index % paletteCycle.length];
      index++;

      const curated = findCuratedProject(repoName);
      const primaryLang = repo.language || '';
      const techStack = curated?.tech || (primaryLang ? [primaryLang] : ['Code']);
      const demo = repo.homepage || curated?.demo_url || null;
      const projectName = curated?.name || repoName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const projectDescription = curated?.description || repo.description || 'Open-source project built and maintained on GitHub.';
      const emoji = curated?.emoji || getProjectEmoji(projectName, projectDescription, techStack);

      projects.push({
        name: projectName,
        description: projectDescription,
        tech: techStack,
        tag: curated?.tag || (primaryLang ? `${primaryLang} Repo` : 'GitHub Repo'),
        emoji: emoji,
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

      existingKeys.add(normalizeProjectKey(projectName));
      existingKeys.add(normalizeProjectKey(repoName));
    }
  }

  // Ensure all curated projects (like IP Chat) are included even if private or omitted in public repos API
  for (const [key, curated] of Object.entries(curatedMap)) {
    const customKey = normalizeProjectKey(curated.name);
    const repoKey = normalizeProjectKey(key);
    if (!existingKeys.has(customKey) && !existingKeys.has(repoKey)) {
      projects.push({
        name: curated.name,
        description: curated.description,
        tech: curated.tech,
        tag: curated.tag,
        emoji: curated.emoji || getProjectEmoji(curated.name, curated.description, curated.tech),
        color: curated.color,
        pin_color: curated.pin_color,
        rotate: curated.rotate,
        github_url: `https://github.com/${GITHUB_USERNAME}/${key}`,
        demo_url: curated.demo_url || null,
        stars: 0,
        forks: 0,
        year: '2026',
        is_dynamic: true,
      });
      existingKeys.add(customKey);
      existingKeys.add(repoKey);
    }
  }

  // Append custom projects (e.g. Jarvis Local AI Assistant)
  for (const custom of customProjects) {
    const customKey = normalizeProjectKey(custom.name);
    if (!existingKeys.has(customKey)) {
      projects.push({
        ...custom,
        emoji: custom.emoji || getProjectEmoji(custom.name, custom.description, custom.tech),
      });
      existingKeys.add(customKey);
    }
  }

  // Strictly enforce user-specified project priority order:
  // 1. IP Chat
  // 2. Personal Portfolio
  // 3. Weather App
  // 4. Hospital Management 2.0
  // 5. Academic Diary
  // 6. Jarvis Local AI Assistant
  return sortProjects(projects.length > 0 ? projects : defaultProjects);
}

function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        profile: parsed.profile || null,
        projects: parsed.repos ? processRepos(parsed.repos) : null,
        lastSynced: parsed.lastSynced || null,
      };
    }
  } catch {
    // Ignore localStorage errors
  }
  return { profile: null, projects: null, lastSynced: null };
}

export function useGitHubData() {
  const initialCache = getInitialState();

  const [profile, setProfile] = useState(() => initialCache.profile || {
    public_repos: initialProfile?.public_repos ?? 5,
    followers: initialProfile?.followers ?? 1,
    following: initialProfile?.following ?? 1,
    bio: initialProfile?.bio ?? 'B.Tech CSE Student | Web & Android Development',
    avatar_url: '/avatar.jpg',
    html_url: initialProfile?.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
  });

  const [projects, setProjects] = useState(() => initialCache.projects || processRepos(initialRepos));
  const [syncStatus, setSyncStatus] = useState(() => (initialCache.lastSynced ? 'synced' : 'idle'));
  const [lastSynced, setLastSynced] = useState(() => initialCache.lastSynced);
  const [rateLimitReset, setRateLimitReset] = useState(null);

  const isMountedRef = useRef(true);

  const syncNow = useCallback(async () => {
    setSyncStatus('syncing');

    try {
      const [userRes, reposRes] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`),
      ]);

      if (!isMountedRef.current) return;

      let newProfile = null;
      let newRepos = null;
      let rateLimited = false;
      let resetEpoch = null;

      if (userRes.status === 'fulfilled') {
        const res = userRes.value;
        const resetHeader = res.headers.get('x-ratelimit-reset');
        if (resetHeader) resetEpoch = parseInt(resetHeader, 10);
        if (res.status === 403) rateLimited = true;

        if (res.ok) {
          const data = await res.json();
          if (data && !data.message) {
            newProfile = {
              public_repos: data.public_repos ?? 5,
              followers: data.followers ?? 1,
              following: data.following ?? 1,
              bio: data.bio ?? '',
              avatar_url: '/avatar.jpg',
              html_url: data.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
            };
          }
        }
      }

      if (reposRes.status === 'fulfilled') {
        const res = reposRes.value;
        const resetHeader = res.headers.get('x-ratelimit-reset');
        if (resetHeader) resetEpoch = parseInt(resetHeader, 10);
        if (res.status === 403) rateLimited = true;

        if (res.ok) {
          const repos = await res.json();
          if (Array.isArray(repos) && !repos.message) {
            newRepos = repos;
          }
        }
      }

      if (resetEpoch) {
        setRateLimitReset(resetEpoch);
      }

      if (newProfile) {
        setProfile(newProfile);
      }

      if (newRepos) {
        const sorted = processRepos(newRepos);
        setProjects(sorted);
      }

      if (newRepos || newProfile) {
        const now = Date.now();
        setSyncStatus('synced');
        setLastSynced(now);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            profile: newProfile || profile,
            repos: newRepos || initialRepos,
            lastSynced: now,
          }));
        } catch {
          // Ignore storage quota
        }
      } else if (rateLimited) {
        setSyncStatus('rate-limited');
      } else {
        setSyncStatus('synced');
      }
    } catch {
      if (isMountedRef.current) {
        setSyncStatus('error');
      }
    }
  }, [profile]);

  useEffect(() => {
    isMountedRef.current = true;

    // Run live sync promptly after initial page load (500ms delay)
    const timer = setTimeout(() => {
      syncNow();
    }, 500);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [syncNow]);

  return { profile, projects, syncStatus, lastSynced, syncNow, rateLimitReset };
}
