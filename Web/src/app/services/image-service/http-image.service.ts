import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseEnvironment } from "@environments/BaseEnvironment";
import { AddComment } from "@models/AddComment";
import { AddImage } from "@models/AddImage";
import { AddImageToCollection } from "@models/AddImageToCollection";
import { Category } from "@models/Category";
import { CategorySearchCriteria } from "@models/CategorySearchCriteria";
import { CommentSearchCriteria } from "@models/CommentSearchCriteria";
import { Image } from "@models/Image";
import { ImageComment } from "@models/ImageComment";
import { ImageSearchCriteria } from "@models/ImageSearchCriteria";
import { ReportReason } from "@models/ReportReason";
import { from, Observable, of } from "rxjs";
import ImageService from ".";
import reasons from "./reasons.json";

@Injectable()
export class HttpImageService implements ImageService {
    readonly baseUrl: string;

    constructor(
        private _http: HttpClient,
        private _environment: BaseEnvironment
    ) {
        this.baseUrl = this._environment.baseUrl;
    }

    reportImage(data: ReportReason): Observable<any> {
        return this._http.post(`${this.baseUrl}api/image/report`, data);
    }

    getReportReasons(): Observable<ReportReason[]> {
        return of(reasons);
    }

    addImageToCollection(data: AddImageToCollection): Observable<any> {
        return this._http.post(`${this.baseUrl}api/image/collection`, data);
    }

    addComment(data: AddComment): Observable<any> {
        return this._http.post(`${this.baseUrl}api/image/comment`, data);
    }

    removeComment(id: number): Observable<any> {
        return this._http.delete(`${this.baseUrl}api/image/comment/${id}`);
    }

    addImage(data: AddImage): Observable<any> {
        return this._http.post(`${this.baseUrl}api/image`, data);
    }

    getCategories(criteria: CategorySearchCriteria) {
        return this._http.post<Category[]>(
            `${this.baseUrl}api/image/category`,
            criteria
        );
    }

    removeImage(id: number): Observable<any> {
        return this._http.delete(`${this.baseUrl}api/image/${id}`);
    }

    getComments(criteria: CommentSearchCriteria) {
        return this._http.post<ImageComment[]>(
            `${this.baseUrl}api/image/${criteria.imageId}/comment/search`,
            criteria
        );
    }

    getImage(id: number) {
        return this._http.get<Image>(`${this.baseUrl}api/image/${id}`);
    }

    getImages(criteria: ImageSearchCriteria) {
        return this._http.post<Image[]>(
            `${this.baseUrl}api/image/search`,
            criteria
        );
    }

    getUserCollection(userId: number) {
        return this._http.post<any>(`${this.baseUrl}api/image/collection`, {
            userId,
        });
    }
}
