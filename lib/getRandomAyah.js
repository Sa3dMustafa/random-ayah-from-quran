export function getRandomAyah(quran) {
  const surah =
    quran.surahs[Math.floor(Math.random() * quran.surahs.length)];
  const ayah =
    surah.ayahs[Math.floor(Math.random() * surah.ayahs.length)];

  return { ayah, surah };
}
