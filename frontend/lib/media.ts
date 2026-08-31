export function estVideo(url: string) {
  return !!url && (url.includes("/video/") || /\.(mp4|webm|mov|ogg)$/i.test(url));
}

// Génère un poster (1re image) pour une vidéo Cloudinary
export function posterMedia(url: string) {
  if (!estVideo(url)) return url;
  return url
    .replace("/upload/", "/upload/so_0/")
    .replace(/\.(mp4|webm|mov|ogg)$/i, ".jpg");
}