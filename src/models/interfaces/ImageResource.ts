export interface ImageSource {
  url: string;
  width: number;
  height: number;
  mime_type: string;
}

export interface ImageResource {
  sources: ImageSource[];
  blurhash: string;
  original_name: string;
} 