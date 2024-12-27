export async function captureAndDownloadImage(
    imageElement: HTMLImageElement,
    containerElement: HTMLDivElement
): Promise<void> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const scaleFactor = 2;

  // Set canvas size to double the resolution
  canvas.width = containerElement.offsetWidth * scaleFactor;
  canvas.height = containerElement.offsetHeight * scaleFactor;

  // Draw white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw circular mask (scaled appropriately)
  ctx.beginPath();
  ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      (canvas.width / 2) - 2,
      0,
      Math.PI * 2
  );
  ctx.clip();

  // Get the bounding rect of the image and container
  const rect = imageElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  const scale = rect.width / imageElement.naturalWidth;

  // Adjust the image position and size with the scale factor
  const x = (rect.left - containerRect.left) * (canvas.width / containerRect.width) * scaleFactor;
  const y = (rect.top - containerRect.top) * (canvas.height / containerRect.height) * scaleFactor;

  const imgWidth = imageElement.naturalWidth * scale * scaleFactor;
  const imgHeight = imageElement.naturalHeight * scale * scaleFactor;

  imageElement.crossOrigin = 'anonymous';

  // Draw the image with corrected position and size
  ctx.drawImage(imageElement, x, y, imgWidth, imgHeight);

  // Add a green stroke around the image (scaled for higher resolution)
  ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      (canvas.width / 2) - 2,
      0,
      Math.PI * 2
  );
  ctx.strokeStyle = '#28c328';
  ctx.lineWidth = 5 * scaleFactor;  // Make the stroke thicker for higher resolution
  ctx.stroke();

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