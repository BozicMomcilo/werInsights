import { ImageSource } from '../models/interfaces/ImageResource';
import { Person } from '../models/interfaces/Person';

export const getClosestImageSource = (sources: ImageSource[], targetSize: number) => {
  if (!sources || sources.length === 0) return null;
  return sources.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.width - targetSize);
    const currDiff = Math.abs(curr.width - targetSize);
    return currDiff < prevDiff ? curr : prev;
  });
};

export const getImageUrl = (member: Person) => {
  if (!member.profile_image?.sources) {
    return '';
  }
  const source = getClosestImageSource(member.profile_image.sources, 40);
  if (!source) {
    return '';
  }
  return source.url.replace('{{BUCKET_ROOT_PUBLIC}}', import.meta.env.VITE_BUCKET_ROOT_PUBLIC || '');
};

