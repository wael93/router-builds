/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { combineLatest } from 'rxjs';
import { filter, scan, startWith, switchMap, take } from 'rxjs/operators';
import { UrlTree } from '../url_tree';
var INITIAL_VALUE = Symbol('INITIAL_VALUE');
export function prioritizedGuardValue() {
    return switchMap(function (obs) {
        return combineLatest.apply(void 0, tslib_1.__spread(obs.map(function (o) { return o.pipe(take(1), startWith(INITIAL_VALUE)); }))).pipe(scan(function (acc, list) {
            var isPending = false;
            return list.reduce(function (innerAcc, val, i) {
                if (innerAcc !== INITIAL_VALUE)
                    return innerAcc;
                // Toggle pending flag if any values haven't been set yet
                if (val === INITIAL_VALUE)
                    isPending = true;
                // Any other return values are only valid if we haven't yet hit a pending call.
                // This guarantees that in the case of a guard at the bottom of the tree that
                // returns a redirect, we will wait for the higher priority guard at the top to
                // finish before performing the redirect.
                if (!isPending) {
                    // Early return when we hit a `false` value as that should always cancel
                    // navigation
                    if (val === false)
                        return val;
                    if (i === list.length - 1 || val instanceof UrlTree) {
                        return val;
                    }
                }
                return innerAcc;
            }, acc);
        }, INITIAL_VALUE), filter(function (item) { return item !== INITIAL_VALUE; }), take(1));
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdGl6ZWRfZ3VhcmRfdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL29wZXJhdG9ycy9wcmlvcml0aXplZF9ndWFyZF92YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUErQixhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXBDLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUc5QyxNQUFNLFVBQVUscUJBQXFCO0lBRW5DLE9BQU8sU0FBUyxDQUFDLFVBQUEsR0FBRztRQUNsQixPQUFPLGFBQWEsZ0NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxhQUErQixDQUFDLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQyxHQUNsRixJQUFJLENBQ0QsSUFBSSxDQUNBLFVBQUMsR0FBbUIsRUFBRSxJQUFzQjtZQUMxQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFTO2dCQUMxQyxJQUFJLFFBQVEsS0FBSyxhQUFhO29CQUFFLE9BQU8sUUFBUSxDQUFDO2dCQUVoRCx5REFBeUQ7Z0JBQ3pELElBQUksR0FBRyxLQUFLLGFBQWE7b0JBQUUsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFFNUMsK0VBQStFO2dCQUMvRSw2RUFBNkU7Z0JBQzdFLCtFQUErRTtnQkFDL0UseUNBQXlDO2dCQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNkLHdFQUF3RTtvQkFDeEUsYUFBYTtvQkFDYixJQUFJLEdBQUcsS0FBSyxLQUFLO3dCQUFFLE9BQU8sR0FBRyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLFlBQVksT0FBTyxFQUFFO3dCQUNuRCxPQUFPLEdBQUcsQ0FBQztxQkFDWjtpQkFDRjtnQkFFRCxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLEVBQ0QsYUFBYSxDQUFDLEVBQ2xCLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxhQUFhLEVBQXRCLENBQXNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQWdDLENBQUM7SUFDMUYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmFibGUsIE9wZXJhdG9yRnVuY3Rpb24sIGNvbWJpbmVMYXRlc3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHNjYW4sIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7VXJsVHJlZX0gZnJvbSAnLi4vdXJsX3RyZWUnO1xuXG5jb25zdCBJTklUSUFMX1ZBTFVFID0gU3ltYm9sKCdJTklUSUFMX1ZBTFVFJyk7XG5kZWNsYXJlIHR5cGUgSU5URVJJTV9WQUxVRVMgPSB0eXBlb2YgSU5JVElBTF9WQUxVRSB8IGJvb2xlYW4gfCBVcmxUcmVlO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJpb3JpdGl6ZWRHdWFyZFZhbHVlKCk6XG4gICAgT3BlcmF0b3JGdW5jdGlvbjxPYnNlcnZhYmxlPGJvb2xlYW58VXJsVHJlZT5bXSwgYm9vbGVhbnxVcmxUcmVlPiB7XG4gIHJldHVybiBzd2l0Y2hNYXAob2JzID0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgIC4uLm9icy5tYXAobyA9PiBvLnBpcGUodGFrZSgxKSwgc3RhcnRXaXRoKElOSVRJQUxfVkFMVUUgYXMgSU5URVJJTV9WQUxVRVMpKSkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAoYWNjOiBJTlRFUklNX1ZBTFVFUywgbGlzdDogSU5URVJJTV9WQUxVRVNbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGlzUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3QucmVkdWNlKChpbm5lckFjYywgdmFsLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyQWNjICE9PSBJTklUSUFMX1ZBTFVFKSByZXR1cm4gaW5uZXJBY2M7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHBlbmRpbmcgZmxhZyBpZiBhbnkgdmFsdWVzIGhhdmVuJ3QgYmVlbiBzZXQgeWV0XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IElOSVRJQUxfVkFMVUUpIGlzUGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW55IG90aGVyIHJldHVybiB2YWx1ZXMgYXJlIG9ubHkgdmFsaWQgaWYgd2UgaGF2ZW4ndCB5ZXQgaGl0IGEgcGVuZGluZyBjYWxsLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGd1YXJhbnRlZXMgdGhhdCBpbiB0aGUgY2FzZSBvZiBhIGd1YXJkIGF0IHRoZSBib3R0b20gb2YgdGhlIHRyZWUgdGhhdFxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5zIGEgcmVkaXJlY3QsIHdlIHdpbGwgd2FpdCBmb3IgdGhlIGhpZ2hlciBwcmlvcml0eSBndWFyZCBhdCB0aGUgdG9wIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmlzaCBiZWZvcmUgcGVyZm9ybWluZyB0aGUgcmVkaXJlY3QuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gRWFybHkgcmV0dXJuIHdoZW4gd2UgaGl0IGEgYGZhbHNlYCB2YWx1ZSBhcyB0aGF0IHNob3VsZCBhbHdheXMgY2FuY2VsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gbmF2aWdhdGlvblxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IGZhbHNlKSByZXR1cm4gdmFsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IGxpc3QubGVuZ3RoIC0gMSB8fCB2YWwgaW5zdGFuY2VvZiBVcmxUcmVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbm5lckFjYztcbiAgICAgICAgICAgICAgICAgIH0sIGFjYyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBJTklUSUFMX1ZBTFVFKSxcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+IGl0ZW0gIT09IElOSVRJQUxfVkFMVUUpLCB0YWtlKDEpKSBhcyBPYnNlcnZhYmxlPGJvb2xlYW58VXJsVHJlZT47XG4gIH0pO1xufVxuIl19