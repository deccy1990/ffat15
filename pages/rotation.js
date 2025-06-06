// pages/rotation.js
import Head from 'next/head';
import { getFreeChampionRotation, getChampionMetadata } from '/lib/riotApi'; // ✅ make sure both functions are available

export async function getServerSideProps() {
  try {
    const [rotationData, championData] = await Promise.all([
      getFreeChampionRotation(),
      getChampionMetadata()
    ]);

    // Build array of champs in the rotation with name + image
    const champions = Object.values(championData);
    const rotation = rotationData.freeChampionIds.map(id => {
      const match = champions.find(champ => champ.key === String(id));
      return {
        id,
        name: match?.name || 'Unknown',
        image: match?.image.full || null,
      };
    });

    return {
      props: {
        rotation,
      },
    };
  } catch (error) {
    return {
      props: {
        rotation: [],
        error: error.message,
      },
    };
  }
}

export default function RotationPage({ rotation, error }) {
  return (
    <>
      <Head>
        <title>Free Champion Rotation | ffat15</title>
      </Head>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Free Champion Rotation</h1>

        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {rotation.map(champ => (
              <li key={champ.id} className="text-center bg-white border rounded shadow p-4">
                {champ.image && (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ.image}`}
                    alt={champ.name}
                    className="w-full h-auto mb-2 rounded"
                  />
                )}
                <p className="font-semibold">{champ.name}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
