import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { GenericCredentials } from 'src/app/models/GenericCredentials';

export default abstract class UserService {
    abstract signOut(): void;
    abstract get isLoggedIn(): BehaviorSubject<boolean>;
    abstract login(credentials: GenericCredentials): Observable<any>;
    abstract clearToken(): void;
    abstract getToken(): string;
    abstract getUserImages(): Observable<any>;
    abstract getProfile(): Observable<Profile>;
}