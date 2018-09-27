/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { switchTap } from './switch_tap';
export function resolveData(paramsInheritanceStrategy) {
    return function (source) {
        return source.pipe(switchTap(function (t) {
            if (!t.preActivation) {
                throw new Error('PreActivation required to resolve data');
            }
            return t.preActivation.resolveData(paramsInheritanceStrategy);
        }));
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9vcGVyYXRvcnMvcmVzb2x2ZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUtILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdkMsTUFBTSxVQUFVLFdBQVcsQ0FBQyx5QkFBaUQ7SUFFM0UsT0FBTyxVQUFTLE1BQXdDO1FBQ3RELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFO2dCQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7YUFDM0Q7WUFDRCxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtOYXZpZ2F0aW9uVHJhbnNpdGlvbn0gZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCB7c3dpdGNoVGFwfSBmcm9tICcuL3N3aXRjaF90YXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZURhdGEocGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneTogJ2VtcHR5T25seScgfCAnYWx3YXlzJyk6XG4gICAgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPE5hdmlnYXRpb25UcmFuc2l0aW9uPiB7XG4gIHJldHVybiBmdW5jdGlvbihzb3VyY2U6IE9ic2VydmFibGU8TmF2aWdhdGlvblRyYW5zaXRpb24+KSB7XG4gICAgcmV0dXJuIHNvdXJjZS5waXBlKHN3aXRjaFRhcCh0ID0+IHtcbiAgICAgIGlmICghdC5wcmVBY3RpdmF0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUHJlQWN0aXZhdGlvbiByZXF1aXJlZCB0byByZXNvbHZlIGRhdGEnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0LnByZUFjdGl2YXRpb24ucmVzb2x2ZURhdGEocGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSk7XG4gICAgfSkpO1xuICB9O1xufVxuIl19