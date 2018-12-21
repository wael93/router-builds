/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { EmptyOutletComponent } from './components/empty_outlet';
import { PRIMARY_OUTLET } from './shared';
var LoadedRouterConfig = /** @class */ (function () {
    function LoadedRouterConfig(routes, module) {
        this.routes = routes;
        this.module = module;
    }
    return LoadedRouterConfig;
}());
export { LoadedRouterConfig };
export function validateConfig(config, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    // forEach doesn't iterate undefined values
    for (var i = 0; i < config.length; i++) {
        var route = config[i];
        var fullPath = getFullPath(parentPath, route);
        validateNode(route, fullPath);
    }
}
function validateNode(route, fullPath) {
    if (!route) {
        throw new Error("\n      Invalid configuration of route '" + fullPath + "': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    ");
    }
    if (Array.isArray(route)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': Array cannot be specified");
    }
    if (!route.component && !route.children && !route.loadChildren &&
        (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': a componentless route without children or loadChildren cannot have a named outlet set");
    }
    if (route.redirectTo && route.children) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and children cannot be used together");
    }
    if (route.redirectTo && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and loadChildren cannot be used together");
    }
    if (route.children && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': children and loadChildren cannot be used together");
    }
    if (route.redirectTo && route.component) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and component cannot be used together");
    }
    if (route.path && route.matcher) {
        throw new Error("Invalid configuration of route '" + fullPath + "': path and matcher cannot be used together");
    }
    if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "'. One of the following must be provided: component, redirectTo, children or loadChildren");
    }
    if (route.path === void 0 && route.matcher === void 0) {
        throw new Error("Invalid configuration of route '" + fullPath + "': routes must have either a path or a matcher specified");
    }
    if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
        throw new Error("Invalid configuration of route '" + fullPath + "': path cannot start with a slash");
    }
    if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
        var exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
        throw new Error("Invalid configuration of route '{path: \"" + fullPath + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
    }
    if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error("Invalid configuration of route '" + fullPath + "': pathMatch can only be set to 'prefix' or 'full'");
    }
    if (route.children) {
        validateConfig(route.children, fullPath);
    }
}
function getFullPath(parentPath, currentRoute) {
    if (!currentRoute) {
        return parentPath;
    }
    if (!parentPath && !currentRoute.path) {
        return '';
    }
    else if (parentPath && !currentRoute.path) {
        return parentPath + "/";
    }
    else if (!parentPath && currentRoute.path) {
        return currentRoute.path;
    }
    else {
        return parentPath + "/" + currentRoute.path;
    }
}
/**
 * Makes a copy of the config and adds any default required properties.
 */
export function standardizeConfig(r) {
    var children = r.children && r.children.map(standardizeConfig);
    var c = children ? tslib_1.__assign({}, r, { children: children }) : tslib_1.__assign({}, r);
    if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
        c.component = EmptyOutletComponent;
    }
    return c;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcm91dGVyL3NyYy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUtILE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUE0WXhDO0lBQ0UsNEJBQW1CLE1BQWUsRUFBUyxNQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ3pFLHlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsVUFBdUI7SUFBdkIsMkJBQUEsRUFBQSxlQUF1QjtJQUNwRSwyQ0FBMkM7SUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBTSxLQUFLLEdBQVUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQU0sUUFBUSxHQUFXLFdBQVcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFZLEVBQUUsUUFBZ0I7SUFDbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQ29CLFFBQVEsb1dBUzNDLENBQUMsQ0FBQztLQUNKO0lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQW1DLFFBQVEsaUNBQThCLENBQUMsQ0FBQztLQUM1RjtJQUNE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Q2pCLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDckMsT0FBTyxFQUFFLENBQUM7S0FDWDtTQUFNLElBQUksVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtRQUMzQyxPQUFVLFVBQVUsTUFBRyxDQUFDO0tBQ3pCO1NBQU0sSUFBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzNDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQztLQUMxQjtTQUFNO1FBQ0wsT0FBVSxVQUFVLFNBQUksWUFBWSxDQUFDLElBQU0sQ0FBQztLQUM3QztBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxDQUFRO0lBQ3hDLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxzQkFBSyxDQUFDLElBQUUsUUFBUSxVQUFBLElBQUUsQ0FBQyxzQkFBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLEVBQUU7UUFDN0YsQ0FBQyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztLQUNwQztJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZUZhY3RvcnksIE5nTW9kdWxlUmVmLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RW1wdHlPdXRsZXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9lbXB0eV9vdXRsZXQnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90fSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge1BSSU1BUllfT1VUTEVUfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1VybFNlZ21lbnQsIFVybFNlZ21lbnRHcm91cH0gZnJvbSAnLi91cmxfdHJlZSc7XG5cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHJvdXRlciBjb25maWd1cmF0aW9uLlxuICpcbiAqIGBSb3V0ZXNgIGlzIGFuIGFycmF5IG9mIHJvdXRlIGNvbmZpZ3VyYXRpb25zLiBFYWNoIG9uZSBoYXMgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqIC0gYHBhdGhgIGlzIGEgc3RyaW5nIHRoYXQgdXNlcyB0aGUgcm91dGUgbWF0Y2hlciBEU0wuXG4gKiAtIGBwYXRoTWF0Y2hgIGlzIGEgc3RyaW5nIHRoYXQgc3BlY2lmaWVzIHRoZSBtYXRjaGluZyBzdHJhdGVneS5cbiAqIC0gYG1hdGNoZXJgIGRlZmluZXMgYSBjdXN0b20gc3RyYXRlZ3kgZm9yIHBhdGggbWF0Y2hpbmcgYW5kIHN1cGVyc2VkZXMgYHBhdGhgIGFuZCBgcGF0aE1hdGNoYC5cbiAqIC0gYGNvbXBvbmVudGAgaXMgYSBjb21wb25lbnQgdHlwZS5cbiAqIC0gYHJlZGlyZWN0VG9gIGlzIHRoZSB1cmwgZnJhZ21lbnQgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBjdXJyZW50IG1hdGNoZWQgc2VnbWVudC5cbiAqIC0gYG91dGxldGAgaXMgdGhlIG5hbWUgb2YgdGhlIG91dGxldCB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBwbGFjZWQgaW50by5cbiAqIC0gYGNhbkFjdGl2YXRlYCBpcyBhbiBhcnJheSBvZiBESSB0b2tlbnMgdXNlZCB0byBsb29rIHVwIENhbkFjdGl2YXRlIGhhbmRsZXJzLiBTZWVcbiAqICAgYENhbkFjdGl2YXRlYCBmb3IgbW9yZSBpbmZvLlxuICogLSBgY2FuQWN0aXZhdGVDaGlsZGAgaXMgYW4gYXJyYXkgb2YgREkgdG9rZW5zIHVzZWQgdG8gbG9vayB1cCBDYW5BY3RpdmF0ZUNoaWxkIGhhbmRsZXJzLiBTZWVcbiAqICAgYENhbkFjdGl2YXRlQ2hpbGRgIGZvciBtb3JlIGluZm8uXG4gKiAtIGBjYW5EZWFjdGl2YXRlYCBpcyBhbiBhcnJheSBvZiBESSB0b2tlbnMgdXNlZCB0byBsb29rIHVwIENhbkRlYWN0aXZhdGUgaGFuZGxlcnMuIFNlZVxuICogICBgQ2FuRGVhY3RpdmF0ZWAgZm9yIG1vcmUgaW5mby5cbiAqIC0gYGNhbkxvYWRgIGlzIGFuIGFycmF5IG9mIERJIHRva2VucyB1c2VkIHRvIGxvb2sgdXAgQ2FuTG9hZCBoYW5kbGVycy4gU2VlXG4gKiAgIGBDYW5Mb2FkYCBmb3IgbW9yZSBpbmZvLlxuICogLSBgZGF0YWAgaXMgYWRkaXRpb25hbCBkYXRhIHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgdmlhIGBBY3RpdmF0ZWRSb3V0ZWAuXG4gKiAtIGByZXNvbHZlYCBpcyBhIG1hcCBvZiBESSB0b2tlbnMgdXNlZCB0byBsb29rIHVwIGRhdGEgcmVzb2x2ZXJzLiBTZWUgYFJlc29sdmVgIGZvciBtb3JlXG4gKiAgIGluZm8uXG4gKiAtIGBydW5HdWFyZHNBbmRSZXNvbHZlcnNgIGRlZmluZXMgd2hlbiBndWFyZHMgYW5kIHJlc29sdmVycyB3aWxsIGJlIHJ1bi4gQnkgZGVmYXVsdCB0aGV5IHJ1biBvbmx5XG4gKiAgICB3aGVuIHRoZSBtYXRyaXggcGFyYW1ldGVycyBvZiB0aGUgcm91dGUgY2hhbmdlLiBPcHRpb25zIGluY2x1ZGU6XG4gKiAgICAtIGBwYXJhbXNDaGFuZ2VgIChkZWZhdWx0KSAtIFJ1biBndWFyZHMgYW5kIHJlc29sdmVycyB3aGVuIHBhdGggb3IgbWF0cml4IHBhcmFtcyBjaGFuZ2UuIFRoaXNcbiAqICAgICAgbW9kZSBpZ25vcmVzIHF1ZXJ5IHBhcmFtIGNoYW5nZXMuXG4gKiAgICAtIGBwYXJhbXNPclF1ZXJ5UGFyYW1zQ2hhbmdlYCAtIEd1YXJkcyBhbmQgcmVzb2x2ZXJzIHdpbGwgcnVuIHdoZW4gYW55IHBhcmFtZXRlcnMgY2hhbmdlLiBUaGlzXG4gKiAgICAgIGluY2x1ZGVzIHBhdGgsIG1hdHJpeCwgYW5kIHF1ZXJ5IHBhcmFtcy5cbiAqICAgIC0gYHBhdGhQYXJhbXNDaGFuZ2VgIC0gUnVuIGd1YXJkcyBhbmQgcmVzb2x2ZXJzIHBhdGggb3IgYW55IHBhdGggcGFyYW1zIGNoYW5nZS4gVGhpcyBtb2RlIGlzXG4gKiAgICAgIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBpZ25vcmUgY2hhbmdlcyB0byBhbGwgb3B0aW9uYWwgcGFyYW1ldGVycyBzdWNoIGFzIHF1ZXJ5ICphbmQqIG1hdHJpeFxuICogICAgICBwYXJhbXMuXG4gKiAgICAtIGBwYXRoUGFyYW1zT3JRdWVyeVBhcmFtc0NoYW5nZWAgLSBTYW1lIGFzIGBwYXRoUGFyYW1zQ2hhbmdlYCwgYnV0IGFsc28gcmVydW4gd2hlbiBhbnkgcXVlcnlcbiAqICAgICAgcGFyYW0gY2hhbmdlc1xuICogICAgLSBgYWx3YXlzYCAtIFJ1biBndWFyZHMgYW5kIHJlc29sdmVycyBvbiBldmVyeSBuYXZpZ2F0aW9uLlxuICogICAgLSAoZnJvbTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgdG86IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpID0+IGJvb2xlYW4gLSBVc2UgYSBwcmVkaWNhdGVcbiAqICAgICAgZnVuY3Rpb24gd2hlbiBub25lIG9mIHRoZSBwcmUtY29uZmlndXJlZCBtb2RlcyBmaXQgdGhlIG5lZWRzIG9mIHRoZSBhcHBsaWNhdGlvbi4gQW4gZXhhbXBsZVxuICogICAgICBtaWdodCBiZSB3aGVuIHlvdSBuZWVkIHRvIGlnbm9yZSB1cGRhdGVzIHRvIGEgcGFyYW0gc3VjaCBhcyBgc29ydERpcmVjdGlvbmAsIGJ1dCBuZWVkIHRvXG4gKiAgICAgIHJlbG9hZCBndWFyZHMgYW5kIHJlc29sdmVycyB3aGVuIGNoYW5naW5nIHRoZSBgc2VhcmNoUm9vdGAgcGFyYW0uXG4gKiAtIGBjaGlsZHJlbmAgaXMgYW4gYXJyYXkgb2YgY2hpbGQgcm91dGUgZGVmaW5pdGlvbnMuXG4gKiAtIGBsb2FkQ2hpbGRyZW5gIGlzIGEgcmVmZXJlbmNlIHRvIGxhenkgbG9hZGVkIGNoaWxkIHJvdXRlcy4gU2VlIGBMb2FkQ2hpbGRyZW5gIGZvciBtb3JlXG4gKiAgIGluZm8uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBTaW1wbGUgQ29uZmlndXJhdGlvblxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJ3RlYW0vOmlkJyxcbiAgKiAgY29tcG9uZW50OiBUZWFtLFxuICogICBjaGlsZHJlbjogW3tcbiAqICAgICBwYXRoOiAndXNlci86bmFtZScsXG4gKiAgICAgY29tcG9uZW50OiBVc2VyXG4gKiAgIH1dXG4gKiB9XVxuICogYGBgXG4gKlxuICogV2hlbiBuYXZpZ2F0aW5nIHRvIGAvdGVhbS8xMS91c2VyL2JvYmAsIHRoZSByb3V0ZXIgd2lsbCBjcmVhdGUgdGhlIHRlYW0gY29tcG9uZW50IHdpdGggdGhlIHVzZXJcbiAqIGNvbXBvbmVudCBpbiBpdC5cbiAqXG4gKiAjIyMgTXVsdGlwbGUgT3V0bGV0c1xuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJ3RlYW0vOmlkJyxcbiAqICAgY29tcG9uZW50OiBUZWFtXG4gKiB9LCB7XG4gKiAgIHBhdGg6ICdjaGF0Lzp1c2VyJyxcbiAqICAgY29tcG9uZW50OiBDaGF0XG4gKiAgIG91dGxldDogJ2F1eCdcbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBXaGVuIG5hdmlnYXRpbmcgdG8gYC90ZWFtLzExKGF1eDpjaGF0L2ppbSlgLCB0aGUgcm91dGVyIHdpbGwgY3JlYXRlIHRoZSB0ZWFtIGNvbXBvbmVudCBuZXh0IHRvXG4gKiB0aGUgY2hhdCBjb21wb25lbnQuIFRoZSBjaGF0IGNvbXBvbmVudCB3aWxsIGJlIHBsYWNlZCBpbnRvIHRoZSBhdXggb3V0bGV0LlxuICpcbiAqICMjIyBXaWxkIENhcmRzXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAnKionLFxuICogICBjb21wb25lbnQ6IFNpbmtcbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBSZWdhcmRsZXNzIG9mIHdoZXJlIHlvdSBuYXZpZ2F0ZSB0bywgdGhlIHJvdXRlciB3aWxsIGluc3RhbnRpYXRlIHRoZSBzaW5rIGNvbXBvbmVudC5cbiAqXG4gKiAjIyMgUmVkaXJlY3RzXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAndGVhbS86aWQnLFxuICogICBjb21wb25lbnQ6IFRlYW0sXG4gKiAgIGNoaWxkcmVuOiBbe1xuICogICAgIHBhdGg6ICdsZWdhY3kvdXNlci86bmFtZScsXG4gKiAgICAgcmVkaXJlY3RUbzogJ3VzZXIvOm5hbWUnXG4gKiAgIH0sIHtcbiAqICAgICBwYXRoOiAndXNlci86bmFtZScsXG4gKiAgICAgY29tcG9uZW50OiBVc2VyXG4gKiAgIH1dXG4gKiB9XVxuICogYGBgXG4gKlxuICogV2hlbiBuYXZpZ2F0aW5nIHRvICcvdGVhbS8xMS9sZWdhY3kvdXNlci9qaW0nLCB0aGUgcm91dGVyIHdpbGwgY2hhbmdlIHRoZSB1cmwgdG9cbiAqICcvdGVhbS8xMS91c2VyL2ppbScsIGFuZCB0aGVuIHdpbGwgaW5zdGFudGlhdGUgdGhlIHRlYW0gY29tcG9uZW50IHdpdGggdGhlIHVzZXIgY29tcG9uZW50XG4gKiBpbiBpdC5cbiAqXG4gKiBJZiB0aGUgYHJlZGlyZWN0VG9gIHZhbHVlIHN0YXJ0cyB3aXRoIGEgJy8nLCB0aGVuIGl0IGlzIGFuIGFic29sdXRlIHJlZGlyZWN0LiBFLmcuLCBpZiBpbiB0aGVcbiAqIGV4YW1wbGUgYWJvdmUgd2UgY2hhbmdlIHRoZSBgcmVkaXJlY3RUb2AgdG8gYC91c2VyLzpuYW1lYCwgdGhlIHJlc3VsdCB1cmwgd2lsbCBiZSAnL3VzZXIvamltJy5cbiAqXG4gKiAjIyMgRW1wdHkgUGF0aFxuICpcbiAqIEVtcHR5LXBhdGggcm91dGUgY29uZmlndXJhdGlvbnMgY2FuIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgY29tcG9uZW50cyB0aGF0IGRvIG5vdCAnY29uc3VtZSdcbiAqIGFueSB1cmwgc2VnbWVudHMuIExldCdzIGxvb2sgYXQgdGhlIGZvbGxvd2luZyBjb25maWd1cmF0aW9uOlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJ3RlYW0vOmlkJyxcbiAqICAgY29tcG9uZW50OiBUZWFtLFxuICogICBjaGlsZHJlbjogW3tcbiAqICAgICBwYXRoOiAnJyxcbiAqICAgICBjb21wb25lbnQ6IEFsbFVzZXJzXG4gKiAgIH0sIHtcbiAqICAgICBwYXRoOiAndXNlci86bmFtZScsXG4gKiAgICAgY29tcG9uZW50OiBVc2VyXG4gKiAgIH1dXG4gKiB9XVxuICogYGBgXG4gKlxuICogV2hlbiBuYXZpZ2F0aW5nIHRvIGAvdGVhbS8xMWAsIHRoZSByb3V0ZXIgd2lsbCBpbnN0YW50aWF0ZSB0aGUgQWxsVXNlcnMgY29tcG9uZW50LlxuICpcbiAqIEVtcHR5LXBhdGggcm91dGVzIGNhbiBoYXZlIGNoaWxkcmVuLlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJ3RlYW0vOmlkJyxcbiAqICAgY29tcG9uZW50OiBUZWFtLFxuICogICBjaGlsZHJlbjogW3tcbiAqICAgICBwYXRoOiAnJyxcbiAqICAgICBjb21wb25lbnQ6IFdyYXBwZXJDbXAsXG4gKiAgICAgY2hpbGRyZW46IFt7XG4gKiAgICAgICBwYXRoOiAndXNlci86bmFtZScsXG4gKiAgICAgICBjb21wb25lbnQ6IFVzZXJcbiAqICAgICB9XVxuICogICB9XVxuICogfV1cbiAqIGBgYFxuICpcbiAqIFdoZW4gbmF2aWdhdGluZyB0byBgL3RlYW0vMTEvdXNlci9qaW1gLCB0aGUgcm91dGVyIHdpbGwgaW5zdGFudGlhdGUgdGhlIHdyYXBwZXIgY29tcG9uZW50IHdpdGhcbiAqIHRoZSB1c2VyIGNvbXBvbmVudCBpbiBpdC5cbiAqXG4gKiBBbiBlbXB0eSBwYXRoIHJvdXRlIGluaGVyaXRzIGl0cyBwYXJlbnQncyBwYXJhbXMgYW5kIGRhdGEuIFRoaXMgaXMgYmVjYXVzZSBpdCBjYW5ub3QgaGF2ZSBpdHNcbiAqIG93biBwYXJhbXMsIGFuZCwgYXMgYSByZXN1bHQsIGl0IG9mdGVuIHVzZXMgaXRzIHBhcmVudCdzIHBhcmFtcyBhbmQgZGF0YSBhcyBpdHMgb3duLlxuICpcbiAqICMjIyBNYXRjaGluZyBTdHJhdGVneVxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIHJvdXRlciB3aWxsIGxvb2sgYXQgd2hhdCBpcyBsZWZ0IGluIHRoZSB1cmwsIGFuZCBjaGVjayBpZiBpdCBzdGFydHMgd2l0aFxuICogdGhlIHNwZWNpZmllZCBwYXRoIChlLmcuLCBgL3RlYW0vMTEvdXNlcmAgc3RhcnRzIHdpdGggYHRlYW0vOmlkYCkuXG4gKlxuICogV2UgY2FuIGNoYW5nZSB0aGUgbWF0Y2hpbmcgc3RyYXRlZ3kgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHBhdGggY292ZXJzIHRoZSB3aG9sZSB1bmNvbnN1bWVkIHVybCxcbiAqIHdoaWNoIGlzIGFraW4gdG8gYHVuY29uc3VtZWRVcmwgPT09IHBhdGhgIG9yIGAkYCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICpcbiAqIFRoaXMgaXMgcGFydGljdWxhcmx5IGltcG9ydGFudCB3aGVuIHJlZGlyZWN0aW5nIGVtcHR5LXBhdGggcm91dGVzLlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJycsXG4gKiAgIHBhdGhNYXRjaDogJ3ByZWZpeCcsIC8vZGVmYXVsdFxuICogICByZWRpcmVjdFRvOiAnbWFpbidcbiAqIH0sIHtcbiAqICAgcGF0aDogJ21haW4nLFxuICogICBjb21wb25lbnQ6IE1haW5cbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBTaW5jZSBhbiBlbXB0eSBwYXRoIGlzIGEgcHJlZml4IG9mIGFueSB1cmwsIGV2ZW4gd2hlbiBuYXZpZ2F0aW5nIHRvICcvbWFpbicsIHRoZSByb3V0ZXIgd2lsbFxuICogc3RpbGwgYXBwbHkgdGhlIHJlZGlyZWN0LlxuICpcbiAqIElmIGBwYXRoTWF0Y2g6IGZ1bGxgIGlzIHByb3ZpZGVkLCB0aGUgcm91dGVyIHdpbGwgYXBwbHkgdGhlIHJlZGlyZWN0IGlmIGFuZCBvbmx5IGlmIG5hdmlnYXRpbmcgdG9cbiAqICcvJy5cbiAqXG4gKiBgYGBcbiAqIFt7XG4gKiAgIHBhdGg6ICcnLFxuICogICBwYXRoTWF0Y2g6ICdmdWxsJyxcbiAqICAgcmVkaXJlY3RUbzogJ21haW4nXG4gKiB9LCB7XG4gKiAgIHBhdGg6ICdtYWluJyxcbiAqICAgY29tcG9uZW50OiBNYWluXG4gKiB9XVxuICogYGBgXG4gKlxuICogIyMjIENvbXBvbmVudGxlc3MgUm91dGVzXG4gKlxuICogSXQgaXMgdXNlZnVsIGF0IHRpbWVzIHRvIGhhdmUgdGhlIGFiaWxpdHkgdG8gc2hhcmUgcGFyYW1ldGVycyBiZXR3ZWVuIHNpYmxpbmcgY29tcG9uZW50cy5cbiAqXG4gKiBTYXkgd2UgaGF2ZSB0d28gY29tcG9uZW50cy0tQ2hpbGRDbXAgYW5kIEF1eENtcC0tdGhhdCB3ZSB3YW50IHRvIHB1dCBuZXh0IHRvIGVhY2ggb3RoZXIgYW5kIGJvdGhcbiAqIG9mIHRoZW0gcmVxdWlyZSBzb21lIGlkIHBhcmFtZXRlci5cbiAqXG4gKiBPbmUgd2F5IHRvIGRvIHRoYXQgd291bGQgYmUgdG8gaGF2ZSBhIGJvZ3VzIHBhcmVudCBjb21wb25lbnQsIHNvIGJvdGggdGhlIHNpYmxpbmdzIGNhbiBnZXQgdGhlIGlkXG4gKiBwYXJhbWV0ZXIgZnJvbSBpdC4gVGhpcyBpcyBub3QgaWRlYWwuIEluc3RlYWQsIHlvdSBjYW4gdXNlIGEgY29tcG9uZW50bGVzcyByb3V0ZS5cbiAqXG4gKiBgYGBcbiAqIFt7XG4gKiAgICBwYXRoOiAncGFyZW50LzppZCcsXG4gKiAgICBjaGlsZHJlbjogW1xuICogICAgICB7IHBhdGg6ICdhJywgY29tcG9uZW50OiBNYWluQ2hpbGQgfSxcbiAqICAgICAgeyBwYXRoOiAnYicsIGNvbXBvbmVudDogQXV4Q2hpbGQsIG91dGxldDogJ2F1eCcgfVxuICogICAgXVxuICogfV1cbiAqIGBgYFxuICpcbiAqIFNvIHdoZW4gbmF2aWdhdGluZyB0byBgcGFyZW50LzEwLyhhLy9hdXg6YilgLCB0aGUgcm91dGUgd2lsbCBpbnN0YW50aWF0ZSB0aGUgbWFpbiBjaGlsZCBhbmQgYXV4XG4gKiBjaGlsZCBjb21wb25lbnRzIG5leHQgdG8gZWFjaCBvdGhlci4gSW4gdGhpcyBleGFtcGxlLCB0aGUgYXBwbGljYXRpb24gY29tcG9uZW50XG4gKiBoYXMgdG8gaGF2ZSB0aGUgcHJpbWFyeSBhbmQgYXV4IG91dGxldHMgZGVmaW5lZC5cbiAqXG4gKiBUaGUgcm91dGVyIHdpbGwgYWxzbyBtZXJnZSB0aGUgYHBhcmFtc2AsIGBkYXRhYCwgYW5kIGByZXNvbHZlYCBvZiB0aGUgY29tcG9uZW50bGVzcyBwYXJlbnQgaW50b1xuICogdGhlIGBwYXJhbXNgLCBgZGF0YWAsIGFuZCBgcmVzb2x2ZWAgb2YgdGhlIGNoaWxkcmVuLiBUaGlzIGlzIGRvbmUgYmVjYXVzZSB0aGVyZSBpcyBubyBjb21wb25lbnRcbiAqIHRoYXQgY2FuIGluamVjdCB0aGUgYWN0aXZhdGVkIHJvdXRlIG9mIHRoZSBjb21wb25lbnRsZXNzIHBhcmVudC5cbiAqXG4gKiBUaGlzIGlzIGVzcGVjaWFsbHkgdXNlZnVsIHdoZW4gY2hpbGQgY29tcG9uZW50cyBhcmUgZGVmaW5lZCBhcyBmb2xsb3dzOlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgIHBhdGg6ICdwYXJlbnQvOmlkJyxcbiAqICAgIGNoaWxkcmVuOiBbXG4gKiAgICAgIHsgcGF0aDogJycsIGNvbXBvbmVudDogTWFpbkNoaWxkIH0sXG4gKiAgICAgIHsgcGF0aDogJycsIGNvbXBvbmVudDogQXV4Q2hpbGQsIG91dGxldDogJ2F1eCcgfVxuICogICAgXVxuICogfV1cbiAqIGBgYFxuICpcbiAqIFdpdGggdGhpcyBjb25maWd1cmF0aW9uIGluIHBsYWNlLCBuYXZpZ2F0aW5nIHRvICcvcGFyZW50LzEwJyB3aWxsIGNyZWF0ZSB0aGUgbWFpbiBjaGlsZCBhbmQgYXV4XG4gKiBjb21wb25lbnRzLlxuICpcbiAqICMjIyBMYXp5IExvYWRpbmdcbiAqXG4gKiBMYXp5IGxvYWRpbmcgc3BlZWRzIHVwIG91ciBhcHBsaWNhdGlvbiBsb2FkIHRpbWUgYnkgc3BsaXR0aW5nIGl0IGludG8gbXVsdGlwbGUgYnVuZGxlcywgYW5kXG4gKiBsb2FkaW5nIHRoZW0gb24gZGVtYW5kLiBUaGUgcm91dGVyIGlzIGRlc2lnbmVkIHRvIG1ha2UgbGF6eSBsb2FkaW5nIHNpbXBsZSBhbmQgZWFzeS4gSW5zdGVhZCBvZlxuICogcHJvdmlkaW5nIHRoZSBjaGlsZHJlbiBwcm9wZXJ0eSwgeW91IGNhbiBwcm92aWRlIHRoZSBgbG9hZENoaWxkcmVuYCBwcm9wZXJ0eSwgYXMgZm9sbG93czpcbiAqXG4gKiBgYGBcbiAqIFt7XG4gKiAgIHBhdGg6ICd0ZWFtLzppZCcsXG4gKiAgIGNvbXBvbmVudDogVGVhbSxcbiAqICAgbG9hZENoaWxkcmVuOiAndGVhbSdcbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBUaGUgcm91dGVyIHdpbGwgdXNlIHJlZ2lzdGVyZWQgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIHRvIGZldGNoIGFuIE5nTW9kdWxlIGFzc29jaWF0ZWQgd2l0aCAndGVhbScuXG4gKiBUaGVuIGl0IHdpbGwgZXh0cmFjdCB0aGUgc2V0IG9mIHJvdXRlcyBkZWZpbmVkIGluIHRoYXQgTmdNb2R1bGUsIGFuZCB3aWxsIHRyYW5zcGFyZW50bHkgYWRkXG4gKiB0aG9zZSByb3V0ZXMgdG8gdGhlIG1haW4gY29uZmlndXJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFJvdXRlcyA9IFJvdXRlW107XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFJlcHJlc2VudHMgdGhlIHJlc3VsdHMgb2YgdGhlIFVSTCBtYXRjaGluZy5cbiAqXG4gKiAqIGBjb25zdW1lZGAgaXMgYW4gYXJyYXkgb2YgdGhlIGNvbnN1bWVkIFVSTCBzZWdtZW50cy5cbiAqICogYHBvc1BhcmFtc2AgaXMgYSBtYXAgb2YgcG9zaXRpb25hbCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgVXJsTWF0Y2hSZXN1bHQgPSB7XG4gIGNvbnN1bWVkOiBVcmxTZWdtZW50W107IHBvc1BhcmFtcz86IHtbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudH07XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEEgZnVuY3Rpb24gbWF0Y2hpbmcgVVJMc1xuICpcbiAqIEEgY3VzdG9tIFVSTCBtYXRjaGVyIGNhbiBiZSBwcm92aWRlZCB3aGVuIGEgY29tYmluYXRpb24gb2YgYHBhdGhgIGFuZCBgcGF0aE1hdGNoYCBpc24ndFxuICogZXhwcmVzc2l2ZSBlbm91Z2guXG4gKlxuICogRm9yIGluc3RhbmNlLCB0aGUgZm9sbG93aW5nIG1hdGNoZXIgbWF0Y2hlcyBodG1sIGZpbGVzLlxuICpcbiAqIGBgYFxuICogZXhwb3J0IGZ1bmN0aW9uIGh0bWxGaWxlcyh1cmw6IFVybFNlZ21lbnRbXSkge1xuICogICByZXR1cm4gdXJsLmxlbmd0aCA9PT0gMSAmJiB1cmxbMF0ucGF0aC5lbmRzV2l0aCgnLmh0bWwnKSA/ICh7Y29uc3VtZWQ6IHVybH0pIDogbnVsbDtcbiAqIH1cbiAqXG4gKiBleHBvcnQgY29uc3Qgcm91dGVzID0gW3sgbWF0Y2hlcjogaHRtbEZpbGVzLCBjb21wb25lbnQ6IEFueUNvbXBvbmVudCB9XTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgVXJsTWF0Y2hlciA9IChzZWdtZW50czogVXJsU2VnbWVudFtdLCBncm91cDogVXJsU2VnbWVudEdyb3VwLCByb3V0ZTogUm91dGUpID0+XG4gICAgVXJsTWF0Y2hSZXN1bHQ7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgc3RhdGljIGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciByb3V0ZS5cbiAqXG4gKiBTZWUgYFJvdXRlc2AgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIERhdGEgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBhbnlcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgcmVzb2x2ZWQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSBwYXJ0aWN1bGFyIHJvdXRlLlxuICpcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgUmVzb2x2ZURhdGEgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBhbnlcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIHR5cGUgb2YgYGxvYWRDaGlsZHJlbmAuXG4gKlxuICogU2VlIGBSb3V0ZXNgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBMb2FkQ2hpbGRyZW5DYWxsYmFjayA9ICgpID0+XG4gICAgVHlwZTxhbnk+fCBOZ01vZHVsZUZhY3Rvcnk8YW55PnwgUHJvbWlzZTxUeXBlPGFueT4+fCBPYnNlcnZhYmxlPFR5cGU8YW55Pj47XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIHR5cGUgb2YgYGxvYWRDaGlsZHJlbmAuXG4gKlxuICogU2VlIGBSb3V0ZXNgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBMb2FkQ2hpbGRyZW4gPSBzdHJpbmcgfCBMb2FkQ2hpbGRyZW5DYWxsYmFjaztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgdHlwZSBvZiBgcXVlcnlQYXJhbXNIYW5kbGluZ2AuXG4gKlxuICogU2VlIGBSb3V0ZXJMaW5rYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgUXVlcnlQYXJhbXNIYW5kbGluZyA9ICdtZXJnZScgfCAncHJlc2VydmUnIHwgJyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIHR5cGUgb2YgYHJ1bkd1YXJkc0FuZFJlc29sdmVyc2AuXG4gKlxuICogU2VlIGBSb3V0ZXNgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFJ1bkd1YXJkc0FuZFJlc29sdmVycyA9ICdwYXRoUGFyYW1zQ2hhbmdlJyB8ICdwYXRoUGFyYW1zT3JRdWVyeVBhcmFtc0NoYW5nZScgfFxuICAgICdwYXJhbXNDaGFuZ2UnIHwgJ3BhcmFtc09yUXVlcnlQYXJhbXNDaGFuZ2UnIHwgJ2Fsd2F5cycgfFxuICAgICgoZnJvbTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgdG86IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpID0+IGJvb2xlYW4pO1xuXG4vKipcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb3V0ZSB7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHBhdGhNYXRjaD86IHN0cmluZztcbiAgbWF0Y2hlcj86IFVybE1hdGNoZXI7XG4gIGNvbXBvbmVudD86IFR5cGU8YW55PjtcbiAgcmVkaXJlY3RUbz86IHN0cmluZztcbiAgb3V0bGV0Pzogc3RyaW5nO1xuICBjYW5BY3RpdmF0ZT86IGFueVtdO1xuICBjYW5BY3RpdmF0ZUNoaWxkPzogYW55W107XG4gIGNhbkRlYWN0aXZhdGU/OiBhbnlbXTtcbiAgY2FuTG9hZD86IGFueVtdO1xuICBkYXRhPzogRGF0YTtcbiAgcmVzb2x2ZT86IFJlc29sdmVEYXRhO1xuICBjaGlsZHJlbj86IFJvdXRlcztcbiAgbG9hZENoaWxkcmVuPzogTG9hZENoaWxkcmVuO1xuICBydW5HdWFyZHNBbmRSZXNvbHZlcnM/OiBSdW5HdWFyZHNBbmRSZXNvbHZlcnM7XG4gIC8qKlxuICAgKiBGaWxsZWQgZm9yIHJvdXRlcyB3aXRoIGBsb2FkQ2hpbGRyZW5gIG9uY2UgdGhlIG1vZHVsZSBoYXMgYmVlbiBsb2FkZWRcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfbG9hZGVkQ29uZmlnPzogTG9hZGVkUm91dGVyQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTG9hZGVkUm91dGVyQ29uZmlnIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlczogUm91dGVbXSwgcHVibGljIG1vZHVsZTogTmdNb2R1bGVSZWY8YW55Pikge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlnKGNvbmZpZzogUm91dGVzLCBwYXJlbnRQYXRoOiBzdHJpbmcgPSAnJyk6IHZvaWQge1xuICAvLyBmb3JFYWNoIGRvZXNuJ3QgaXRlcmF0ZSB1bmRlZmluZWQgdmFsdWVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm91dGU6IFJvdXRlID0gY29uZmlnW2ldO1xuICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSBnZXRGdWxsUGF0aChwYXJlbnRQYXRoLCByb3V0ZSk7XG4gICAgdmFsaWRhdGVOb2RlKHJvdXRlLCBmdWxsUGF0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOb2RlKHJvdXRlOiBSb3V0ZSwgZnVsbFBhdGg6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIXJvdXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBFbmNvdW50ZXJlZCB1bmRlZmluZWQgcm91dGUuXG4gICAgICBUaGUgcmVhc29uIG1pZ2h0IGJlIGFuIGV4dHJhIGNvbW1hLlxuXG4gICAgICBFeGFtcGxlOlxuICAgICAgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgICAgIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICcvZGFzaGJvYXJkJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcbiAgICAgICAgeyBwYXRoOiAnZGFzaGJvYXJkJywgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50IH0sLCA8PCB0d28gY29tbWFzXG4gICAgICAgIHsgcGF0aDogJ2RldGFpbC86aWQnLCBjb21wb25lbnQ6IEhlcm9EZXRhaWxDb21wb25lbnQgfVxuICAgICAgXTtcbiAgICBgKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBBcnJheSBjYW5ub3QgYmUgc3BlY2lmaWVkYCk7XG4gIH1cbiAgaWYgKCFyb3V0ZS5jb21wb25lbnQgJiYgIXJvdXRlLmNoaWxkcmVuICYmICFyb3V0ZS5sb2FkQ2hpbGRyZW4gJiZcbiAgICAgIChyb3V0ZS5vdXRsZXQgJiYgcm91dGUub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9JzogYSBjb21wb25lbnRsZXNzIHJvdXRlIHdpdGhvdXQgY2hpbGRyZW4gb3IgbG9hZENoaWxkcmVuIGNhbm5vdCBoYXZlIGEgbmFtZWQgb3V0bGV0IHNldGApO1xuICB9XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvICYmIHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHJlZGlyZWN0VG8gYW5kIGNoaWxkcmVuIGNhbm5vdCBiZSB1c2VkIHRvZ2V0aGVyYCk7XG4gIH1cbiAgaWYgKHJvdXRlLnJlZGlyZWN0VG8gJiYgcm91dGUubG9hZENoaWxkcmVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHJlZGlyZWN0VG8gYW5kIGxvYWRDaGlsZHJlbiBjYW5ub3QgYmUgdXNlZCB0b2dldGhlcmApO1xuICB9XG4gIGlmIChyb3V0ZS5jaGlsZHJlbiAmJiByb3V0ZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9JzogY2hpbGRyZW4gYW5kIGxvYWRDaGlsZHJlbiBjYW5ub3QgYmUgdXNlZCB0b2dldGhlcmApO1xuICB9XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvICYmIHJvdXRlLmNvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiByZWRpcmVjdFRvIGFuZCBjb21wb25lbnQgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXJgKTtcbiAgfVxuICBpZiAocm91dGUucGF0aCAmJiByb3V0ZS5tYXRjaGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHBhdGggYW5kIG1hdGNoZXIgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXJgKTtcbiAgfVxuICBpZiAocm91dGUucmVkaXJlY3RUbyA9PT0gdm9pZCAwICYmICFyb3V0ZS5jb21wb25lbnQgJiYgIXJvdXRlLmNoaWxkcmVuICYmICFyb3V0ZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9Jy4gT25lIG9mIHRoZSBmb2xsb3dpbmcgbXVzdCBiZSBwcm92aWRlZDogY29tcG9uZW50LCByZWRpcmVjdFRvLCBjaGlsZHJlbiBvciBsb2FkQ2hpbGRyZW5gKTtcbiAgfVxuICBpZiAocm91dGUucGF0aCA9PT0gdm9pZCAwICYmIHJvdXRlLm1hdGNoZXIgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiByb3V0ZXMgbXVzdCBoYXZlIGVpdGhlciBhIHBhdGggb3IgYSBtYXRjaGVyIHNwZWNpZmllZGApO1xuICB9XG4gIGlmICh0eXBlb2Ygcm91dGUucGF0aCA9PT0gJ3N0cmluZycgJiYgcm91dGUucGF0aC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHBhdGggY2Fubm90IHN0YXJ0IHdpdGggYSBzbGFzaGApO1xuICB9XG4gIGlmIChyb3V0ZS5wYXRoID09PSAnJyAmJiByb3V0ZS5yZWRpcmVjdFRvICE9PSB2b2lkIDAgJiYgcm91dGUucGF0aE1hdGNoID09PSB2b2lkIDApIHtcbiAgICBjb25zdCBleHAgPVxuICAgICAgICBgVGhlIGRlZmF1bHQgdmFsdWUgb2YgJ3BhdGhNYXRjaCcgaXMgJ3ByZWZpeCcsIGJ1dCBvZnRlbiB0aGUgaW50ZW50IGlzIHRvIHVzZSAnZnVsbCcuYDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJ3twYXRoOiBcIiR7ZnVsbFBhdGh9XCIsIHJlZGlyZWN0VG86IFwiJHtyb3V0ZS5yZWRpcmVjdFRvfVwifSc6IHBsZWFzZSBwcm92aWRlICdwYXRoTWF0Y2gnLiAke2V4cH1gKTtcbiAgfVxuICBpZiAocm91dGUucGF0aE1hdGNoICE9PSB2b2lkIDAgJiYgcm91dGUucGF0aE1hdGNoICE9PSAnZnVsbCcgJiYgcm91dGUucGF0aE1hdGNoICE9PSAncHJlZml4Jykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBwYXRoTWF0Y2ggY2FuIG9ubHkgYmUgc2V0IHRvICdwcmVmaXgnIG9yICdmdWxsJ2ApO1xuICB9XG4gIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgIHZhbGlkYXRlQ29uZmlnKHJvdXRlLmNoaWxkcmVuLCBmdWxsUGF0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RnVsbFBhdGgocGFyZW50UGF0aDogc3RyaW5nLCBjdXJyZW50Um91dGU6IFJvdXRlKTogc3RyaW5nIHtcbiAgaWYgKCFjdXJyZW50Um91dGUpIHtcbiAgICByZXR1cm4gcGFyZW50UGF0aDtcbiAgfVxuICBpZiAoIXBhcmVudFBhdGggJiYgIWN1cnJlbnRSb3V0ZS5wYXRoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2UgaWYgKHBhcmVudFBhdGggJiYgIWN1cnJlbnRSb3V0ZS5wYXRoKSB7XG4gICAgcmV0dXJuIGAke3BhcmVudFBhdGh9L2A7XG4gIH0gZWxzZSBpZiAoIXBhcmVudFBhdGggJiYgY3VycmVudFJvdXRlLnBhdGgpIHtcbiAgICByZXR1cm4gY3VycmVudFJvdXRlLnBhdGg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3BhcmVudFBhdGh9LyR7Y3VycmVudFJvdXRlLnBhdGh9YDtcbiAgfVxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGUgY29uZmlnIGFuZCBhZGRzIGFueSBkZWZhdWx0IHJlcXVpcmVkIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZUNvbmZpZyhyOiBSb3V0ZSk6IFJvdXRlIHtcbiAgY29uc3QgY2hpbGRyZW4gPSByLmNoaWxkcmVuICYmIHIuY2hpbGRyZW4ubWFwKHN0YW5kYXJkaXplQ29uZmlnKTtcbiAgY29uc3QgYyA9IGNoaWxkcmVuID8gey4uLnIsIGNoaWxkcmVufSA6IHsuLi5yfTtcbiAgaWYgKCFjLmNvbXBvbmVudCAmJiAoY2hpbGRyZW4gfHwgYy5sb2FkQ2hpbGRyZW4pICYmIChjLm91dGxldCAmJiBjLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpKSB7XG4gICAgYy5jb21wb25lbnQgPSBFbXB0eU91dGxldENvbXBvbmVudDtcbiAgfVxuICByZXR1cm4gYztcbn1cbiJdfQ==