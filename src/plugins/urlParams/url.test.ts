import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getUrlParam, setUrlParam } from './url';

describe('url utils', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        // Reset URL before each test
        const url = new URL('http://localhost:3000/');
        window.history.replaceState({}, '', url);
    });

    describe('getUrlParam', () => {
        it('should return null when param does not exist', () => {
             expect(getUrlParam('test')).toBeNull();
        });

        it('should return single value string', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('foo', 'bar');
            window.history.replaceState({}, '', url);

            expect(getUrlParam('foo')).toBe('bar');
        });

        it('should return array of strings for multiple values', () => {
            const url = new URL(window.location.href);
            url.searchParams.append('tags', 'a');
            url.searchParams.append('tags', 'b');
            window.history.replaceState({}, '', url);

            expect(getUrlParam('tags')).toEqual(['a', 'b']);
        });
    });

    describe('setUrlParam', () => {
        it('should set a single value', () => {
            setUrlParam('foo', 'bar');
            const url = new URL(window.location.href);
            expect(url.searchParams.get('foo')).toBe('bar');
        });

        it('should update existing value', () => {
            setUrlParam('foo', 'initial');
            setUrlParam('foo', 'updated');
            const url = new URL(window.location.href);
            expect(url.searchParams.get('foo')).toBe('updated');
        });

        it('should set multiple values from array', () => {
            setUrlParam('tags', ['x', 'y']);
            const url = new URL(window.location.href);
            expect(url.searchParams.getAll('tags')).toEqual(['x', 'y']);
        });

        it('should replace existing array values', () => {
            setUrlParam('tags', ['a', 'b']);
            setUrlParam('tags', ['c', 'd']);
            const url = new URL(window.location.href);
            expect(url.searchParams.getAll('tags')).toEqual(['c', 'd']);
        });

        it('should remove param when value is null', () => {
            setUrlParam('foo', 'bar');
            setUrlParam('foo', null);
            const url = new URL(window.location.href);
            expect(url.searchParams.has('foo')).toBe(false);
        });
        
         it('should remove param when value is undefined', () => {
            setUrlParam('foo', 'bar');
             // @ts-ignore
            setUrlParam('foo', undefined); 
            const url = new URL(window.location.href);
            expect(url.searchParams.has('foo')).toBe(false);
        });
    });
});
