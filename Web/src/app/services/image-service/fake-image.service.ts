import ImageService from '.';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AddComment } from '@models/AddComment';
import { ReportReason } from '@models/ReportReason';
import { AddImageToCollection } from '@models/AddImageToCollection';
import { AddImage } from '@models/AddImage';
import { BaseEnvironment } from '@environments/BaseEnvironment';
import { Image } from '@models/Image';
import { Category } from '@models/Category';
import { ImageSearchCriteria } from '@models/ImageSearchCriteria';
import { CommentSearchCriteria } from '@models/CommentSearchCriteria';
import { CategorySearchCriteria } from '@models/CategorySearchCriteria';
import { ImageComment } from '@models/ImageComment';
import reasons from './reasons.json'

const imageLinks = [
    "https://i.pinimg.com/originals/61/45/f8/6145f8f9f2ad74793b8152929c2bfd2a.jpg",
    "https://i.pinimg.com/236x/b6/98/e5/b698e580e873c6b34c3832c97a4dad24.jpg",
    "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg",
    "https://i.pinimg.com/236x/e1/20/4c/e1204c56cee42142dea1fe50db7d3b28.jpg",
    "https://i.pinimg.com/236x/0e/b7/c7/0eb7c7e2315c9a9d69a0de3efb10e7a9.jpg",
    "https://i.pinimg.com/236x/fd/12/76/fd1276edd6eec2f9a2826bec26fc6b50.jpg",
    "https://i.pinimg.com/236x/71/5c/e4/715ce4fa16601425b31674dcc308ac8a.jpg",
    "https://i.pinimg.com/236x/83/ad/da/83adda5f43d9baf44eaf46e5dcb0e475.jpg",
    "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
  ]
  
  const collection = [
    {
      category: 'Animals',
      categoryId: 1,
      images: [
        {
          link: "https://cdn.britannica.com/s:800x450,c:crop/66/195966-138-F9E7A828/facts-turtles.jpg"
        },
        {
          link: "https://upload.wikimedia.org/wikipedia/commons/7/72/Igel.JPG"
        }
      ],
    },
    {
      category: 'Forest',
      categoryId: 2,
      images: [
        {
          link: "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/65/b1/49/65b149e192024fe025faf84bed18d1a1.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/e1/20/4c/e1204c56cee42142dea1fe50db7d3b28.jpg"
        },
        {
          link: "https://i.pinimg.com/236x/8d/66/d6/8d66d68654ff371d191e8de62a647706.jpg"
        }
      ],
    }
  ]
  
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan nisl sit amet risus imperdiet sagittis. Sed consectetur dolor quis molestie imperdiet. Maecenas et nulla aliquet, tempus mauris quis, tempus erat. Cras ut mauris libero. Suspendisse et arcu ut sem vestibulum porttitor sed id nulla. Aenean eu sapien et orci feugiat vestibulum at in nibh. Vestibulum ante tellus, aliquam ac ante ac, laoreet feugiat ligula.";

  const images = imageLinks.map((link, id) => ({
    id,
    link,
    title: loremIpsum.substring(0, 50),
    description: loremIpsum.substring(0, 255)
  }))
  
  const categories = [
    {
      id: 1,
      name: 'Forest',
      link: 'https://www.positive.news/wp-content/uploads/2019/03/feat-1800x0-c-center.jpg'
    },
    {
      id: 2,
      name: 'Animals',
      link: 'https://assets.change.org/photos/0/ys/te/RbystepLvbGJuix-800x450-noPad.jpg?1509858550'
    },
    {
      id: 3,
      name: 'Art',
      link: 'https://mymodernmet.com/wp/wp-content/uploads/2019/03/elements-of-art-6.jpg'
    }
  ]
  
  const comments = Array(10).fill(0).map((pr, index) => ({
      id: index + 1,
      userId: 1,
      avatar: "https://i.pinimg.com/236x/b6/98/e5/b698e580e873c6b34c3832c97a4dad24.jpg",
      author: 'Steve Wonders',
      created: (new Date()).toString(),
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor diam magna, sit amet tincidunt elit dictum ut. Pellentesque ullamcorper orci a urna consequat, nec vestibulum mi aliquam. Integer at augue nec libero laoreet pulvinar eu eget metus.`
    }));
  

@Injectable()
export class FakeImageService implements ImageService {

  comments: ImageComment[];

  constructor() {
    this.comments = comments;
  }

  reportImage(data: ReportReason): Observable<any> {
    return throwError('');
    return of(null);
  }

  getReportReasons(): Observable<ReportReason[]> {
    return of(reasons);
  }

  getImages(criteria: ImageSearchCriteria): Observable<Image[]> {
    return of(images);
  }

  getImage(id: number): Observable<Image> {
    return of(images.find(image => image.id === id));
  }

  getComments(criteria: CommentSearchCriteria): Observable<ImageComment[]> {

    const currentIndex = criteria.page * criteria.pageSize;
    const nextIndex = currentIndex + criteria.pageSize;

    const comments = this.comments.slice(currentIndex, nextIndex);
    console.log(criteria, comments)
    return of(comments);
  }

  addComment(data: AddComment): Observable<any> {
    return of([]);
  }

  removeComment(id: number): Observable<any> {
    return of([]);
  }

  blobs = [];
  lastImageId = null;
  lastFileType = null;

  addImage(model: AddImage): Observable<any> {
    
    this.lastFileType = model.fileType;

    if(!model.imageId) {
      this.lastImageId = Math.floor(Math.random() * 100);
    }

    const { data, offset } = model;
    this.blobs.push({
      data,
      offset
    });

    return of({
      imageId: this.lastImageId
    });
  }

  addImageToCollection(data: AddImageToCollection): Observable<any> {
    return of([]);
  }

  removeImage(id: number): Observable<any> {
    return of([]);
  }

  getCategories(criteria: CategorySearchCriteria): Observable<Category[]> {
    return of([]);
  }

  getUserCollection(userId: number): Observable<any[]> {
    return of(collection);
  }

}