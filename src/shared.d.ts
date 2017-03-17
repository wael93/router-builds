/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Route, UrlMatchResult } from './config';
import { UrlSegment, UrlSegmentGroup } from './url_tree';
/**
 * @whatItDoes Name of the primary outlet.
 *
 * @stable
 */
export declare const PRIMARY_OUTLET = "primary";
/**
 * A collection of parameters.
 *
 * @stable
 */
export declare type Params = {
    [key: string]: any;
};
export declare function navigationCancelingError(message: string): Error;
export declare function isNavigationCancelingError(error: Error): any;
export declare function defaultUrlMatcher(segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult;
