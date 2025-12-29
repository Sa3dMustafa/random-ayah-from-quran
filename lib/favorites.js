import Swal from "sweetalert2";

export function saveFavorite(ayah) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  if (stored.some((a) => a.number === ayah.number)) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "الآية محفوظة بالفعل ⭐",
      showConfirmButton: false,
      timer: 2000,
    });
    return false;
  }

  stored.push({
    number: ayah.number,
    numberInSurah: ayah.numberInSurah,
    text: ayah.text,
    audio: ayah.audio || ayah.audioFull || "", // ✅ رابط الصوت على مستوى الآية
    surah: {
      name: ayah.surah?.name || "غير معروف",
      number: ayah.surah?.number || 0,
    },
  });

  localStorage.setItem("favorites", JSON.stringify(stored));

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "تم حفظ الآية 🤍",
    showConfirmButton: false,
    timer: 2000,
  });

  return true;
}

export function isFavorite(ayahNumber) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  return stored.some((a) => a.number === ayahNumber);
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function removeFavorite(ayahNumber) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  const filtered = stored.filter((a) => a.number !== ayahNumber);
  localStorage.setItem("favorites", JSON.stringify(filtered));
  return filtered;
}
