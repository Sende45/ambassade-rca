"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { CLOUDINARY } from "@/lib/cloudinary";
import { estVideo } from "@/lib/media";

type UploadMediaProps = {
  valeur: string;
  onChange: (url: string) => void;
};

export default function UploadMedia({ valeur, onChange }: UploadMediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progression, setProgression] = useState<number | null>(null);
  const [erreur, setErreur] = useState("");

  function choisir() {
    inputRef.current?.click();
  }

  function televerser(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    setErreur("");
    setProgression(0);

    const data = new FormData();
    data.append("file", fichier);
    data.append("upload_preset", CLOUDINARY.preset);

    const xhr = new XMLHttpRequest();
    // /auto/ gère aussi bien les images que les vidéos
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/auto/upload`);

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) setProgression(Math.round((ev.loaded / ev.total) * 100));
    };
    xhr.onload = () => {
      setProgression(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        const rep = JSON.parse(xhr.responseText);
        onChange(rep.secure_url as string);
      } else {
        setErreur("Échec du téléversement. Vérifie le nom du preset Cloudinary.");
      }
    };
    xhr.onerror = () => {
      setProgression(null);
      setErreur("Erreur réseau pendant le téléversement.");
    };
    xhr.send(data);
    e.target.value = ""; // permet de re-téléverser le même fichier
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={televerser}
        className="hidden"
      />

      {valeur ? (
        <div className="relative overflow-hidden rounded-xl border border-nuit/10 bg-white">
          {estVideo(valeur) ? (
            <video src={valeur} controls className="h-48 w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={valeur} alt="Aperçu du média" className="h-48 w-full object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            title="Retirer le média"
            className="absolute right-2 top-2 rounded-full bg-nuit-900/70 p-1.5 text-creme transition-colors hover:bg-nuit-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={choisir}
          disabled={progression !== null}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-nuit/20 bg-white py-8 text-ardoise/60 transition-colors hover:border-or hover:text-or-fonce disabled:opacity-60"
        >
          {progression !== null ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-sans text-sm">Téléversement… {progression}%</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-6 w-6" />
              <span className="font-sans text-sm">Télécharger une photo ou une vidéo</span>
              <span className="font-sans text-xs text-ardoise/40">JPG, PNG, MP4, MOV…</span>
            </>
          )}
        </button>
      )}

      {erreur && <p className="mt-2 font-sans text-sm text-red-600">{erreur}</p>}
    </div>
  );
}