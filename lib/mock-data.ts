export const generateMockUserData = (username: string) => {
  const baseScore = Math.floor(Math.random() * 40) + 60

  return {
    avatar: `https://api.github.com/users/${username}/avatar_url` || 'https://avatars.githubusercontent.com/u/1?v=4',
    name: username.charAt(0).toUpperCase() + username.slice(1),
    login: username,
    bio: '🚀 Developer passionate about building amazing software',
    followers: Math.floor(Math.random() * 5000) + 100,
    following: Math.floor(Math.random() * 500) + 10,
    publicRepos: Math.floor(Math.random() * 100) + 20,
    persona: 'The Midnight Architect',
    score: baseScore,
    change: Math.floor(Math.random() * 20) - 5,
  }
}

export const generateImpactTrend = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    value: Math.floor(Math.random() * 40) + 50,
  }))
}

export const generateLanguageDNA = () => {
  return [
    { skill: 'Frontend', level: Math.floor(Math.random() * 40) + 60 },
    { skill: 'Backend', level: Math.floor(Math.random() * 40) + 60 },
    { skill: 'DevOps', level: Math.floor(Math.random() * 40) + 50 },
    { skill: 'Mobile', level: Math.floor(Math.random() * 40) + 40 },
    { skill: 'Documentation', level: Math.floor(Math.random() * 40) + 50 },
  ]
}

export const generateContributionData = () => {
  return Array(52)
    .fill(null)
    .map(() =>
      Array(7)
        .fill(null)
        .map(() => Math.floor(Math.random() * 25))
    )
}

export const generateCommitData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, idx) => ({
    month,
    commits: Math.floor(Math.random() * 200) + 50,
    peak: idx === Math.floor(Math.random() * 12),
  }))
}

export const generateRepositories = () => {
  const languages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++']
  const adjectives = ['Fast', 'Smart', 'Powerful', 'Elegant', 'Advanced', 'Modern']
  const nouns = ['Builder', 'Engine', 'CLI', 'Framework', 'Library', 'Platform']

  return Array(6)
    .fill(null)
    .map((_, i) => ({
      name: `${adjectives[i % adjectives.length].toLowerCase()}-${nouns[i % nouns.length].toLowerCase()}`,
      language: languages[i % languages.length],
      stars: Math.floor(Math.random() * 50000) + 5000,
      forks: Math.floor(Math.random() * 20000) + 1000,
      health: Math.floor(Math.random() * 30) + 70,
      description: `A powerful tool for ${['building applications', 'managing data', 'automating workflows'][i % 3]}`,
      recentCommits: Math.floor(Math.random() * 15),
      tags: [generateLanguageDNA()[i % 5].skill]
    }))
}
