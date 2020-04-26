import { Category } from './Category';
import { Image } from './Image';

export interface ImageGroupedByCategory {
    category: Category;
    images: Image[];
}