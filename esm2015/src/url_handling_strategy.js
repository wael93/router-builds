/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description
 *
 * Provides a way to migrate AngularJS applications to Angular.
 *
 * @experimental
 */
export class UrlHandlingStrategy {
}
/**
 * @experimental
 */
export class DefaultUrlHandlingStrategy {
    shouldProcessUrl(url) { return true; }
    extract(url) { return url; }
    merge(newUrlPart, wholeUrl) { return newUrlPart; }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX2hhbmRsaW5nX3N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy91cmxfaGFuZGxpbmdfc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUg7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFnQixtQkFBbUI7Q0FxQnhDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLGdCQUFnQixDQUFDLEdBQVksSUFBYSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsT0FBTyxDQUFDLEdBQVksSUFBYSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsS0FBSyxDQUFDLFVBQW1CLEVBQUUsUUFBaUIsSUFBYSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDOUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VXJsVHJlZX0gZnJvbSAnLi91cmxfdHJlZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUHJvdmlkZXMgYSB3YXkgdG8gbWlncmF0ZSBBbmd1bGFySlMgYXBwbGljYXRpb25zIHRvIEFuZ3VsYXIuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXJsSGFuZGxpbmdTdHJhdGVneSB7XG4gIC8qKlxuICAgKiBUZWxscyB0aGUgcm91dGVyIGlmIHRoaXMgVVJMIHNob3VsZCBiZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIFdoZW4gaXQgcmV0dXJucyB0cnVlLCB0aGUgcm91dGVyIHdpbGwgZXhlY3V0ZSB0aGUgcmVndWxhciBuYXZpZ2F0aW9uLlxuICAgKiBXaGVuIGl0IHJldHVybnMgZmFsc2UsIHRoZSByb3V0ZXIgd2lsbCBzZXQgdGhlIHJvdXRlciBzdGF0ZSB0byBhbiBlbXB0eSBzdGF0ZS5cbiAgICogQXMgYSByZXN1bHQsIGFsbCB0aGUgYWN0aXZlIGNvbXBvbmVudHMgd2lsbCBiZSBkZXN0cm95ZWQuXG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBzaG91bGRQcm9jZXNzVXJsKHVybDogVXJsVHJlZSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSBwYXJ0IG9mIHRoZSBVUkwgdGhhdCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcm91dGVyLlxuICAgKiBUaGUgcmVzdCBvZiB0aGUgVVJMIHdpbGwgcmVtYWluIHVudG91Y2hlZC5cbiAgICovXG4gIGFic3RyYWN0IGV4dHJhY3QodXJsOiBVcmxUcmVlKTogVXJsVHJlZTtcblxuICAvKipcbiAgICogTWVyZ2VzIHRoZSBVUkwgZnJhZ21lbnQgd2l0aCB0aGUgcmVzdCBvZiB0aGUgVVJMLlxuICAgKi9cbiAgYWJzdHJhY3QgbWVyZ2UobmV3VXJsUGFydDogVXJsVHJlZSwgcmF3VXJsOiBVcmxUcmVlKTogVXJsVHJlZTtcbn1cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0VXJsSGFuZGxpbmdTdHJhdGVneSBpbXBsZW1lbnRzIFVybEhhbmRsaW5nU3RyYXRlZ3kge1xuICBzaG91bGRQcm9jZXNzVXJsKHVybDogVXJsVHJlZSk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuICBleHRyYWN0KHVybDogVXJsVHJlZSk6IFVybFRyZWUgeyByZXR1cm4gdXJsOyB9XG4gIG1lcmdlKG5ld1VybFBhcnQ6IFVybFRyZWUsIHdob2xlVXJsOiBVcmxUcmVlKTogVXJsVHJlZSB7IHJldHVybiBuZXdVcmxQYXJ0OyB9XG59Il19