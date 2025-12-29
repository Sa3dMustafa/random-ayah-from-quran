"use client";

import { useState } from "react";
import { reciters } from "@/lib/reciters";

export default function AyahPlayer({ ayahGlobalNumber }) {
  const [reciter, setReciter] = useState(reciters[0]);

  const audioUrl =
    `${reciter.url}` +
    `${ayahGlobalNumber.toString().padStart(6, "0")}.mp3`;

  return (
    <div>
      <select
        value={reciter.name}
        onChange={(e) =>
          setReciter(reciters.find(r => r.name === e.target.value))
        }
      >
        {reciters.map(r => (
          <option key={r.name} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>

      <audio key={audioUrl} controls preload="none">
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
}
