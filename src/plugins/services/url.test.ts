import { beforeEach, describe, expect, it } from 'vitest';
import { buildUrlParams, UrlParamsService } from './url';

describe('url utils', () => {
    const originalLocation = window.location;
    let service: UrlParamsService

    beforeEach(() => {
        // Reset URL before each test
        const url = new URL('http://localhost:3000/');
        window.history.replaceState({}, '', url);
        service = buildUrlParams()
    });

    describe('getUrlParam', () => {
        it('should return null when param does not exist', () => {
             expect(service.get('test')).toBeNull();
        });

        it('should return single value string', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('foo', 'bar');
            window.history.replaceState({}, '', url);

            expect(service.get('foo')).toBe('bar');
        });

        it('should return array of strings for multiple values', () => {
            const url = new URL(window.location.href);
            url.searchParams.append('tags', 'a');
            url.searchParams.append('tags', 'b');
            window.history.replaceState({}, '', url);

            expect(service.get('tags')).toEqual(['a', 'b']);
        });
    });

    describe('setUrlParam', () => {
        it('should set a single value', () => {
            service.set('foo', 'bar');
            const url = new URL(window.location.href);
            expect(url.searchParams.get('foo')).toBe('bar');
        });

        it('should update existing value', () => {
            service.set('foo', 'initial');
            service.set('foo', 'updated');
            const url = new URL(window.location.href);
            expect(url.searchParams.get('foo')).toBe('updated');
        });

        it('should set multiple values from array', () => {
            service.set('tags', ['x', 'y']);
            const url = new URL(window.location.href);
            expect(url.searchParams.getAll('tags')).toEqual(['x', 'y']);
        });

        it('should replace existing array values', () => {
            service.set('tags', ['a', 'b']);
            service.set('tags', ['c', 'd']);
            const url = new URL(window.location.href);
            expect(url.searchParams.getAll('tags')).toEqual(['c', 'd']);
        });

        it('should remove param when value is null', () => {
            service.set('foo', 'bar');
            service.set('foo', null);
            const url = new URL(window.location.href);
            expect(url.searchParams.has('foo')).toBe(false);
        });
        
         it('should remove param when value is undefined', () => {
            service.set('foo', 'bar');
            service.set('foo', undefined); 
            const url = new URL(window.location.href);
            expect(url.searchParams.has('foo')).toBe(false);
        });
    });
});
