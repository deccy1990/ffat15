// lib/riotApi.js

export async function getFreeChampionRotation() {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    throw new Error('Riot API key is missing');
  }

  const res = await fetch(
    'https://na1.api.riotgames.com/lol/platform/v3/champion-rotations',
    {
      headers: {
        'X-Riot-Token': apiKey,
      },
    }
  );

  if (!res.ok) {
    console.error('API Error:', res.status, await res.text());
    throw new Error('Failed to fetch rotation data');
  }

  return res.json();
}

export async function getLatestVersion() {
  const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  if (!res.ok) throw new Error('Failed to fetch patch versions');
  const versions = await res.json();
  return versions[0]; // latest version (e.g., "14.11.1")
}

export async function getChampionMetadata() {
  const version = await getLatestVersion();
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);

  if (!res.ok) {
    throw new Error('Failed to fetch champion metadata');
  }

  const data = await res.json();
  return data.data; // champion data
}
