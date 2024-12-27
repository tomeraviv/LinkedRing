export async function captureAndDownloadImage(
  imageElement: HTMLImageElement,
  containerElement: HTMLDivElement
): Promise<void> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size to match container
  canvas.width = containerElement.offsetWidth;
  canvas.height = containerElement.offsetHeight;

  // Draw white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw circular mask
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
    0,
    Math.PI * 2
  );
  ctx.clip();

  // Calculate image position and size
  const rect = imageElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();
  
  const scale = rect.width / imageElement.naturalWidth;
  const x = (rect.left - containerRect.left) * (canvas.width / containerRect.width);
  const y = (rect.top - containerRect.top) * (canvas.height / containerRect.height);
  
  ctx.drawImage(
    imageElement,
    x,
    y,
    imageElement.naturalWidth * scale,
    imageElement.naturalHeight * scale
  );

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile-photo.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}