export interface AddImage {
    imageId?: number;
    title?: string;
    description?: string;
    categoryId?: number;
    category?: string;
    fileType: string;
    fileName: string;
    data: Uint8Array;
    offset: number;
}