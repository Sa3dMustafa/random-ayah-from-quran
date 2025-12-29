import QuranClient from "@/components/QuranClient";
import { getRandomAyah } from "@/lib/getRandomAyah";

export const revalidate = 3600;

export default async function Page() {
  const res = await fetch(
    "https://api.alquran.cloud/v1/quran/ar.alafasy",
    { cache: "force-cache" }
  );
  const data = await res.json();

  const { ayah, surah } = getRandomAyah(data.data);

  return <QuranClient initialAyah={ayah} initialSurah={surah} />;
}
