"use client";

import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (ayahNumber) => {
    const updated = removeFavorite(ayahNumber);
    setFavorites(updated);
  };

  const handleClearAll = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <div className="random-quran fade favorites-page">
      {/* هيدر */}
      <div className="header">
        <button
          className="success-btn"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
        >
          ⬅️ رجوع
        </button>

        {favorites.length > 0 && (
          <button className="danger-btn" onClick={handleClearAll}>
            🗑️ حذف الكل
          </button>
        )}

        {/* زر تغيير المود */}
        <ThemeToggle className="theme-btn" />
      </div>

      <h1 className="title">الآيات المحفوظة</h1>

      {favorites.length === 0 ? (
        <p className="meta empty">لا يوجد آيات محفوظة بعد</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((f) => (
            <div key={f.number} className="fav-card fade">
              <button
                className="remove-btn"
                onClick={() => handleRemoveFavorite(f.number)}
              >
                ❌ إزالة
              </button>

              <p className="Ayah">{f.text}</p>
              <p className="meta">
                سورة {f.surah?.name || "غير معروف"} • آية {f.numberInSurah}
              </p>

              {f.audio && (
                <audio controls preload="none" className="audio">
                  <source src={f.audio} type="audio/mpeg" />
                  متصفحك لا يدعم تشغيل الصوت
                </audio>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
