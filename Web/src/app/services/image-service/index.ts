import { Observable } from 'rxjs';
import { AddComment } from '@models/AddComment';
import { AddImageToCollection } from '@models/AddImageToCollection';
import { AddImage } from '@models/AddImage';
import { Category } from '@models/Category';
import { Image } from '@models/Image';
import { ImageSearchCriteria } from '@models/ImageSearchCriteria';
import { CommentSearchCriteria } from '@models/CommentSearchCriteria';
import { CategorySearchCriteria } from '@models/CategorySearchCriteria';
import { ReportReason } from '@models/ReportReason';
import { ImageComment } from '@models/ImageComment';

export default abstract class ImageService {
    abstract reportImage(data: ReportReason): Observable<any>
    abstract getReportReasons(): Observable<ReportReason[]>
    abstract getImages(criteria: ImageSearchCriteria): Observable<Image[]>
    abstract getImage(id: number): Observable<Image>
    abstract getComments(criteria: CommentSearchCriteria): Observable<ImageComment[]>
    abstract addComment(data: AddComment): Observable<any>
    abstract removeComment(id: number): Observable<any>
    abstract addImage(data: AddImage): Observable<any>
    abstract addImageToCollection(data: AddImageToCollection): Observable<any>
    abstract removeImage(id: number): Observable<any>
    abstract getCategories(criteria: CategorySearchCriteria): Observable<Category[]>
    abstract getUserCollection(userId: number): Observable<any[]>
}