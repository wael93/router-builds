/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, isDevMode } from '@angular/core';
import { NavigationEnd } from '../events';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
import * as i0 from "@angular/core";
/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * Consider the following route configuration:
 * `[{ path: 'user/:name', component: UserCmp }]`.
 * When linking to this `user/:name` route, you use the `RouterLink` directive.
 *
 * If the link is static, you can use the directive as follows:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
 * Multiple static segments can be merged into one
 * (e.g., `['/team/11/user', userName, {details: true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 *   app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 *   instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * (Deprecated in v4.0.0 use `queryParamsHandling` instead) You can also tell the
 * directive to preserve the current query params and fragment:
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
 *   link to user component
 * </a>
 * ```
 *
 * You can tell the directive to how to handle queryParams, available options are:
 *  - `'merge'`: merge the queryParams into the current queryParams
 *  - `'preserve'`: preserve the current queryParams
 *  - default/`''`: use the queryParams only
 *
 * Same options for {@link NavigationExtras#queryParamsHandling
 * NavigationExtras#queryParamsHandling}.
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * You can provide a `state` value to be persisted to the browser's History.state
 * property (See https://developer.mozilla.org/en-US/docs/Web/API/History#Properties). It's
 * used as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
 *   link to user component
 * </a>
 * ```
 *
 * And later the value can be read from the router through `router.getCurrentNavigation.
 * For example, to capture the `tracingId` above during the `NavigationStart` event:
 *
 * ```
 * // Get NavigationStart events
 * router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
 *   const navigation = router.getCurrentNavigation();
 *   tracingService.trace({id: navigation.extras.state.tracingId});
 * });
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`.
 *
 * See {@link Router#createUrlTree createUrlTree} for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
var RouterLink = /** @class */ (function () {
    function RouterLink(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.commands = [];
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLink.prototype, "preserveQueryParams", {
        /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         */
        set: function (value) {
            if (isDevMode() && console && console.warn) {
                console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.onClick = function () {
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    };
    Object.defineProperty(RouterLink.prototype, "urlTree", {
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.ngDirectiveDef = i0.ɵdefineDirective({ type: RouterLink, selectors: [["", "routerLink", "", 5, "a"]], factory: function RouterLink_Factory(t) { return new (t || RouterLink)(i0.ɵdirectiveInject(Router), i0.ɵdirectiveInject(ActivatedRoute), i0.ɵinjectAttribute('tabindex'), i0.ɵdirectiveInject(Renderer2), i0.ɵdirectiveInject(ElementRef)); }, hostBindings: function RouterLink_HostBindings(rf, ctx, elIndex) { if (rf & 1) {
            i0.ɵlistener("click", function RouterLink_click_HostBindingHandler($event) { return ctx.onClick(); });
        } }, inputs: { queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", state: "state", routerLink: "routerLink", preserveQueryParams: "preserveQueryParams" } });
    return RouterLink;
}());
export { RouterLink };
/*@__PURE__*/ i0.ɵsetClassMetadata(RouterLink, [{
        type: Directive,
        args: [{ selector: ':not(a)[routerLink]' }]
    }], [{
        type: Router
    }, {
        type: ActivatedRoute
    }, {
        type: undefined,
        decorators: [{
                type: Attribute,
                args: ['tabindex']
            }]
    }, {
        type: Renderer2
    }, {
        type: ElementRef
    }], { queryParams: [{
            type: Input
        }], fragment: [{
            type: Input
        }], queryParamsHandling: [{
            type: Input
        }], preserveFragment: [{
            type: Input
        }], skipLocationChange: [{
            type: Input
        }], replaceUrl: [{
            type: Input
        }], state: [{
            type: Input
        }], routerLink: [{
            type: Input
        }], preserveQueryParams: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] });
/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
var RouterLinkWithHref = /** @class */ (function () {
    function RouterLinkWithHref(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                _this.updateTargetUrlAndHref();
            }
        });
    }
    Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
        set: function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLinkWithHref.prototype, "preserveQueryParams", {
        set: function (value) {
            if (isDevMode() && console && console.warn) {
                console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkWithHref.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
    RouterLinkWithHref.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    RouterLinkWithHref.prototype.onClick = function (button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        var extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    };
    RouterLinkWithHref.prototype.updateTargetUrlAndHref = function () {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    };
    Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkWithHref.ngDirectiveDef = i0.ɵdefineDirective({ type: RouterLinkWithHref, selectors: [["a", "routerLink", ""]], factory: function RouterLinkWithHref_Factory(t) { return new (t || RouterLinkWithHref)(i0.ɵdirectiveInject(Router), i0.ɵdirectiveInject(ActivatedRoute), i0.ɵdirectiveInject(LocationStrategy)); }, hostBindings: function RouterLinkWithHref_HostBindings(rf, ctx, elIndex) { if (rf & 1) {
            i0.ɵlistener("click", function RouterLinkWithHref_click_HostBindingHandler($event) { return ctx.onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey); });
        } if (rf & 2) {
            i0.ɵelementAttribute(elIndex, "target", i0.ɵbind(ctx.target));
            i0.ɵelementProperty(elIndex, "href", i0.ɵbind(ctx.href));
        } }, hostVars: 2, inputs: { target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", state: "state", routerLink: "routerLink", preserveQueryParams: "preserveQueryParams" }, features: [i0.ɵNgOnChangesFeature] });
    return RouterLinkWithHref;
}());
export { RouterLinkWithHref };
/*@__PURE__*/ i0.ɵsetClassMetadata(RouterLinkWithHref, [{
        type: Directive,
        args: [{ selector: 'a[routerLink]' }]
    }], [{
        type: Router
    }, {
        type: ActivatedRoute
    }, {
        type: LocationStrategy
    }], { target: [{
            type: HostBinding,
            args: ['attr.target']
        }, {
            type: Input
        }], queryParams: [{
            type: Input
        }], fragment: [{
            type: Input
        }], queryParamsHandling: [{
            type: Input
        }], preserveFragment: [{
            type: Input
        }], skipLocationChange: [{
            type: Input
        }], replaceUrl: [{
            type: Input
        }], state: [{
            type: Input
        }], href: [{
            type: HostBinding
        }], routerLink: [{
            type: Input
        }], preserveQueryParams: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey']]
        }] });
function attrBoolValue(s) {
    return s === '' || !!s;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSTdJLE9BQU8sRUFBQyxhQUFhLEVBQWMsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBSS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Rkc7QUFDSDtJQW1CRSxvQkFDWSxNQUFjLEVBQVUsS0FBcUIsRUFDOUIsUUFBZ0IsRUFBRSxRQUFtQixFQUFFLEVBQWM7UUFEcEUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBTGpELGFBQVEsR0FBVSxFQUFFLENBQUM7UUFPM0IsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3BCLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRUQsc0JBQ0ksa0NBQVU7YUFEZCxVQUNlLFFBQXNCO1lBQ25DLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDcEIs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Szs7a0JBQ0wsS0FBSzs7a0JBUUwsV0FBVzs7a0JBWVgsS0FBSzs7a0JBU0wsS0FBSzs7a0JBV0wsWUFBWTttQkFBQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7O0FBbUNqRyxTQUFTLGFBQWEsQ0FBQyxDQUFNO0lBQzNCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QXR0cmlidXRlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1F1ZXJ5UGFyYW1zSGFuZGxpbmd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlckV2ZW50fSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICcuLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtVcmxUcmVlfSBmcm9tICcuLi91cmxfdHJlZSc7XG5cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBMZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHJvdXRlcyBpbiB5b3VyIGFwcC5cbiAqXG4gKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIHJvdXRlIGNvbmZpZ3VyYXRpb246XG4gKiBgW3sgcGF0aDogJ3VzZXIvOm5hbWUnLCBjb21wb25lbnQ6IFVzZXJDbXAgfV1gLlxuICogV2hlbiBsaW5raW5nIHRvIHRoaXMgYHVzZXIvOm5hbWVgIHJvdXRlLCB5b3UgdXNlIHRoZSBgUm91dGVyTGlua2AgZGlyZWN0aXZlLlxuICpcbiAqIElmIHRoZSBsaW5rIGlzIHN0YXRpYywgeW91IGNhbiB1c2UgdGhlIGRpcmVjdGl2ZSBhcyBmb2xsb3dzOlxuICogYDxhIHJvdXRlckxpbms9XCIvdXNlci9ib2JcIj5saW5rIHRvIHVzZXIgY29tcG9uZW50PC9hPmBcbiAqXG4gKiBJZiB5b3UgdXNlIGR5bmFtaWMgdmFsdWVzIHRvIGdlbmVyYXRlIHRoZSBsaW5rLCB5b3UgY2FuIHBhc3MgYW4gYXJyYXkgb2YgcGF0aFxuICogc2VnbWVudHMsIGZvbGxvd2VkIGJ5IHRoZSBwYXJhbXMgZm9yIGVhY2ggc2VnbWVudC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UgYFsnL3RlYW0nLCB0ZWFtSWQsICd1c2VyJywgdXNlck5hbWUsIHtkZXRhaWxzOiB0cnVlfV1gXG4gKiBtZWFucyB0aGF0IHdlIHdhbnQgdG8gZ2VuZXJhdGUgYSBsaW5rIHRvIGAvdGVhbS8xMS91c2VyL2JvYjtkZXRhaWxzPXRydWVgLlxuICpcbiAqIE11bHRpcGxlIHN0YXRpYyBzZWdtZW50cyBjYW4gYmUgbWVyZ2VkIGludG8gb25lXG4gKiAoZS5nLiwgYFsnL3RlYW0vMTEvdXNlcicsIHVzZXJOYW1lLCB7ZGV0YWlsczogdHJ1ZX1dYCkuXG4gKlxuICogVGhlIGZpcnN0IHNlZ21lbnQgbmFtZSBjYW4gYmUgcHJlcGVuZGVkIHdpdGggYC9gLCBgLi9gLCBvciBgLi4vYDpcbiAqICogSWYgdGhlIGZpcnN0IHNlZ21lbnQgYmVnaW5zIHdpdGggYC9gLCB0aGUgcm91dGVyIHdpbGwgbG9vayB1cCB0aGUgcm91dGUgZnJvbSB0aGUgcm9vdCBvZiB0aGVcbiAqICAgYXBwLlxuICogKiBJZiB0aGUgZmlyc3Qgc2VnbWVudCBiZWdpbnMgd2l0aCBgLi9gLCBvciBkb2Vzbid0IGJlZ2luIHdpdGggYSBzbGFzaCwgdGhlIHJvdXRlciB3aWxsXG4gKiAgIGluc3RlYWQgbG9vayBpbiB0aGUgY2hpbGRyZW4gb2YgdGhlIGN1cnJlbnQgYWN0aXZhdGVkIHJvdXRlLlxuICogKiBBbmQgaWYgdGhlIGZpcnN0IHNlZ21lbnQgYmVnaW5zIHdpdGggYC4uL2AsIHRoZSByb3V0ZXIgd2lsbCBnbyB1cCBvbmUgbGV2ZWwuXG4gKlxuICogWW91IGNhbiBzZXQgcXVlcnkgcGFyYW1zIGFuZCBmcmFnbWVudCBhcyBmb2xsb3dzOlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9ib2InXVwiIFtxdWVyeVBhcmFtc109XCJ7ZGVidWc6IHRydWV9XCIgZnJhZ21lbnQ9XCJlZHVjYXRpb25cIj5cbiAqICAgbGluayB0byB1c2VyIGNvbXBvbmVudFxuICogPC9hPlxuICogYGBgXG4gKiBSb3V0ZXJMaW5rIHdpbGwgdXNlIHRoZXNlIHRvIGdlbmVyYXRlIHRoaXMgbGluazogYC91c2VyL2JvYiNlZHVjYXRpb24/ZGVidWc9dHJ1ZWAuXG4gKlxuICogKERlcHJlY2F0ZWQgaW4gdjQuMC4wIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZCkgWW91IGNhbiBhbHNvIHRlbGwgdGhlXG4gKiBkaXJlY3RpdmUgdG8gcHJlc2VydmUgdGhlIGN1cnJlbnQgcXVlcnkgcGFyYW1zIGFuZCBmcmFnbWVudDpcbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvYm9iJ11cIiBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIHByZXNlcnZlRnJhZ21lbnQ+XG4gKiAgIGxpbmsgdG8gdXNlciBjb21wb25lbnRcbiAqIDwvYT5cbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gdGVsbCB0aGUgZGlyZWN0aXZlIHRvIGhvdyB0byBoYW5kbGUgcXVlcnlQYXJhbXMsIGF2YWlsYWJsZSBvcHRpb25zIGFyZTpcbiAqICAtIGAnbWVyZ2UnYDogbWVyZ2UgdGhlIHF1ZXJ5UGFyYW1zIGludG8gdGhlIGN1cnJlbnQgcXVlcnlQYXJhbXNcbiAqICAtIGAncHJlc2VydmUnYDogcHJlc2VydmUgdGhlIGN1cnJlbnQgcXVlcnlQYXJhbXNcbiAqICAtIGRlZmF1bHQvYCcnYDogdXNlIHRoZSBxdWVyeVBhcmFtcyBvbmx5XG4gKlxuICogU2FtZSBvcHRpb25zIGZvciB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtc0hhbmRsaW5nXG4gKiBOYXZpZ2F0aW9uRXh0cmFzI3F1ZXJ5UGFyYW1zSGFuZGxpbmd9LlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9ib2InXVwiIFtxdWVyeVBhcmFtc109XCJ7ZGVidWc6IHRydWV9XCIgcXVlcnlQYXJhbXNIYW5kbGluZz1cIm1lcmdlXCI+XG4gKiAgIGxpbmsgdG8gdXNlciBjb21wb25lbnRcbiAqIDwvYT5cbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gcHJvdmlkZSBhIGBzdGF0ZWAgdmFsdWUgdG8gYmUgcGVyc2lzdGVkIHRvIHRoZSBicm93c2VyJ3MgSGlzdG9yeS5zdGF0ZVxuICogcHJvcGVydHkgKFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSGlzdG9yeSNQcm9wZXJ0aWVzKS4gSXQnc1xuICogdXNlZCBhcyBmb2xsb3dzOlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9ib2InXVwiIFtzdGF0ZV09XCJ7dHJhY2luZ0lkOiAxMjN9XCI+XG4gKiAgIGxpbmsgdG8gdXNlciBjb21wb25lbnRcbiAqIDwvYT5cbiAqIGBgYFxuICpcbiAqIEFuZCBsYXRlciB0aGUgdmFsdWUgY2FuIGJlIHJlYWQgZnJvbSB0aGUgcm91dGVyIHRocm91Z2ggYHJvdXRlci5nZXRDdXJyZW50TmF2aWdhdGlvbi5cbiAqIEZvciBleGFtcGxlLCB0byBjYXB0dXJlIHRoZSBgdHJhY2luZ0lkYCBhYm92ZSBkdXJpbmcgdGhlIGBOYXZpZ2F0aW9uU3RhcnRgIGV2ZW50OlxuICpcbiAqIGBgYFxuICogLy8gR2V0IE5hdmlnYXRpb25TdGFydCBldmVudHNcbiAqIHJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZSA9PiBlIGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSkuc3Vic2NyaWJlKGUgPT4ge1xuICogICBjb25zdCBuYXZpZ2F0aW9uID0gcm91dGVyLmdldEN1cnJlbnROYXZpZ2F0aW9uKCk7XG4gKiAgIHRyYWNpbmdTZXJ2aWNlLnRyYWNlKHtpZDogbmF2aWdhdGlvbi5leHRyYXMuc3RhdGUudHJhY2luZ0lkfSk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSByb3V0ZXIgbGluayBkaXJlY3RpdmUgYWx3YXlzIHRyZWF0cyB0aGUgcHJvdmlkZWQgaW5wdXQgYXMgYSBkZWx0YSB0byB0aGUgY3VycmVudCB1cmwuXG4gKlxuICogRm9yIGluc3RhbmNlLCBpZiB0aGUgY3VycmVudCB1cmwgaXMgYC91c2VyLyhib3gvL2F1eDp0ZWFtKWAuXG4gKlxuICogVGhlbiB0aGUgZm9sbG93aW5nIGxpbmsgYDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvamltJ11cIj5KaW08L2E+YCB3aWxsIGdlbmVyYXRlIHRoZSBsaW5rXG4gKiBgL3VzZXIvKGppbS8vYXV4OnRlYW0pYC5cbiAqXG4gKiBTZWUge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIGNyZWF0ZVVybFRyZWV9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBuZ01vZHVsZSBSb3V0ZXJNb2R1bGVcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnOm5vdChhKVtyb3V0ZXJMaW5rXSd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmsge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgIToge1trOiBzdHJpbmddOiBhbnl9O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgZnJhZ21lbnQgITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgc2tpcExvY2F0aW9uQ2hhbmdlICE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0YXRlPzoge1trOiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZSAhOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKHRhYkluZGV4ID09IG51bGwpIHtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCByb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIDQuMC4wIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIDxhbnk+Y29uc29sZSAmJiA8YW55PmNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKCdwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIGlzIGRlcHJlY2F0ZWQhLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICB0aGlzLnByZXNlcnZlID0gdmFsdWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXh0cmFzID0ge1xuICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiBhdHRyQm9vbFZhbHVlKHRoaXMuc2tpcExvY2F0aW9uQ2hhbmdlKSxcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcbiAgICB9O1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy51cmxUcmVlLCBleHRyYXMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXG4gICAgICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zOiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmUpLFxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogTGV0cyB5b3UgbGluayB0byBzcGVjaWZpYyByb3V0ZXMgaW4geW91ciBhcHAuXG4gKlxuICogU2VlIGBSb3V0ZXJMaW5rYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ2Fbcm91dGVyTGlua10nfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rV2l0aEhyZWYgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFyZ2V0JykgQElucHV0KCkgdGFyZ2V0ICE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHtbazogc3RyaW5nXTogYW55fTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIGZyYWdtZW50ICE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgITogUXVlcnlQYXJhbXNIYW5kbGluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHNraXBMb2NhdGlvbkNoYW5nZSAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCAhOiBib29sZWFuO1xuICBASW5wdXQoKSBzdGF0ZT86IHtbazogc3RyaW5nXTogYW55fTtcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcblxuICAvLyB0aGUgdXJsIGRpc3BsYXllZCBvbiB0aGUgYW5jaG9yIGVsZW1lbnQuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASG9zdEJpbmRpbmcoKSBocmVmICE6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogUm91dGVyRXZlbnQpID0+IHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCByb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmcpIHtcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxuICBuZ09uRGVzdHJveSgpOiBhbnkgeyB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC5idXR0b24nLCAnJGV2ZW50LmN0cmxLZXknLCAnJGV2ZW50Lm1ldGFLZXknLCAnJGV2ZW50LnNoaWZ0S2V5J10pXG4gIG9uQ2xpY2soYnV0dG9uOiBudW1iZXIsIGN0cmxLZXk6IGJvb2xlYW4sIG1ldGFLZXk6IGJvb2xlYW4sIHNoaWZ0S2V5OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKGJ1dHRvbiAhPT0gMCB8fCBjdHJsS2V5IHx8IG1ldGFLZXkgfHwgc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9ICdfc2VsZicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dHJhcyA9IHtcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZVxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk6IHZvaWQge1xuICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xuICB9XG5cbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXG4gICAgICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zOiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmUpLFxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpLFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGF0dHJCb29sVmFsdWUoczogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBzID09PSAnJyB8fCAhIXM7XG59XG4iXX0=