"use client";

import { useEffect, useState } from "react";
import { getRandomAyah } from "@/lib/getRandomAyah";
import { saveFavorite, isFavorite } from "@/lib/favorites";
import ThemeToggle from "./ThemeToggle";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

export default function QuranClient({ initialAyah, initialSurah }) {
  const [ayah, setAyah] = useState(initialAyah);
  const [surah, setSurah] = useState(initialSurah);
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFavorite(isFavorite(ayah.number));
  }, [ayah]);

  const changeAyah = async () => {
    setLoading(true);

    let data = quranData;
    if (!data) {
      const res = await fetch("https://api.alquran.cloud/v1/quran/ar.alafasy");
      const json = await res.json();
      data = json.data;
      setQuranData(data);
    }

    const result = getRandomAyah(data);
    setAyah(result.ayah);
    setSurah(result.surah);

    setLoading(false);
  };

  const shareAyah = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "آية من القرآن الكريم",
        text: ayah.text,
      });
    } else {
      await navigator.clipboard.writeText(ayah.text);
      alert("تم نسخ الآية");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="random-quran fade">
      {/* هيدر */}
      <div className="header">
        <ThemeToggle className="theme-btn" />
      </div>

      <h1 className="title">آيات من القرآن الكريم</h1>

      <p className="Ayah">{ayah.text}</p>
      <p>السورة: {surah.name}</p>
      <p>رقم الآية: {ayah.numberInSurah}</p>

      {ayah.audio && (
        <audio key={ayah.audio} controls preload="none" className="audio">
          <source src={ayah.audio} type="audio/mpeg" />
        </audio>
      )}

      <div className="actions">
        <button onClick={changeAyah}>🔁 تغيير الآية</button>

        <button
          className={favorite ? "fav active" : "fav"}
          onClick={() => {
            const saved = saveFavorite({
              number: ayah.number,
              numberInSurah: ayah.numberInSurah,
              text: ayah.text,
              audio: ayah.audio,
              surah: {
                name: surah.name,
                number: surah.number,
              },
            });

            if (saved) setFavorite(true);
          }}
        >
          {favorite ? "⭐ محفوظة" : "🤍 حفظ"}
        </button>

        <button onClick={() => router.push("/favorites")}>📂 المفضلة</button>

        <button onClick={shareAyah}>📤 مشاركة</button>
      </div>
    </div>
  );
}
