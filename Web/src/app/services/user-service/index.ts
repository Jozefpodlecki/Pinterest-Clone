import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from '@models/profile';
import { GenericCredentials } from '@models/GenericCredentials';
import { UpdateProfile } from '@models/UpdateProfile';

export default abstract class UserService {
    abstract signOut(): void;
    abstract login(credentials: GenericCredentials): Observable<any>;
    abstract clearToken(): void;
    abstract getToken(): string;
    abstract getUserImages(): Observable<any>;
    abstract updateProfile(data: UpdateProfile): Observable<any>;
    abstract getProfile(): Observable<Profile>;
}