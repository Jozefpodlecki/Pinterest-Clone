import { Observable, from, of } from 'rxjs';
import ImageService from '.';
import { HttpClient } from '@angular/common/http';
import { AddComment } from '@models/AddComment';
import { AddImageToCollection } from '@models/AddImageToCollection';
import { AddImage } from '@models/AddImage';
import { BaseEnvironment } from '@environments/BaseEnvironment';
import { Image } from '@models/Image';
import { Category } from '@models/Category';
import { ImageSearchCriteria } from '@models/ImageSearchCriteria';
import { CommentSearchCriteria } from '@models/CommentSearchCriteria';
import { CategorySearchCriteria } from '@models/CategorySearchCriteria';
import { Injectable } from '@angular/core';
import { ReportReason } from '@models/ReportReason';

@Injectable()
export class HttpImageService implements ImageService {

  readonly baseUrl: string;

  constructor(
    private _http: HttpClient,
    private _environment: BaseEnvironment) {
    this.baseUrl = this._environment.baseUrl;
  }
  getReportReasons(): Observable<ReportReason[]> {
    return of([
      {
        id: 1,
        title: 'Spam',
        description: 'Misleading or repetitive posts'
      },
      {
        id: 2,
        title: 'Nudity or pornography',
        description: 'Sexually explicit content'
      },
      {
        id: 3,
        title: 'Self-harm',
        description: 'Eating disorders, cutting, suicide'
      },
      {
        id: 4,
        title: 'Misinformation',
        description: 'Health misinformation, conspiracies, manipulated images'
      },
      {
        id: 5,
        title: 'Hateful activities',
        description: 'Prejudice, stereotypes, white supremacy'
      },
      {
        id: 6,
        title: 'Dangerous goods',
        description: 'Drugs, weapons, regulated products'
      },
      {
        id: 7,
        title: 'Harassment or privacy violations',
        description: 'Insults, threats, personally identifiable info'
      },
      {
        id: 8,
        title: 'Graphic violence',
        description: 'Violent images or promotion of violence'
      },
      {
        id: 9,
        title: 'My intellectual property',
        description: 'Copyright or trademark infringement'
      }
    ])
  }
  
  addImageToCollection(data: AddImageToCollection): Observable<any> {
    return this._http.post(`${this.baseUrl}api/image/collection`, data)
  }

  addComment(data: AddComment): Observable<any> {
    return this._http.post(`${this.baseUrl}api/image/comment`, data)
  }

  removeComment(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}api/image/comment/${id}`)
  }

  addImage(data: AddImage): Observable<any> {
    return this._http.post(`${this.baseUrl}api/image`, data)
  }

  getCategories(criteria: CategorySearchCriteria) {
    return this._http.post<Category[]>(`${this.baseUrl}api/image/category`, criteria)
  }

  removeImage(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}api/image/${id}`)
  }

  getComments(criteria: CommentSearchCriteria) {
    return this._http.post<Comment[]>(`${this.baseUrl}api/image/${criteria.imageId}/comment/search`, criteria)
  }

  getImage(id: number) {
    return this._http.get<Image>(`${this.baseUrl}api/image/${id}`)
  }

  getImages(criteria: ImageSearchCriteria) {
    return this._http.post<Image[]>(`${this.baseUrl}api/image/search`, criteria)
  }

  getUserCollection(userId: number) {
    return this._http.post<any>(`${this.baseUrl}api/image/collection`, {
      userId
    })
  }
}
