import { describe, expect, it } from 'vitest'
import { formatPrice, getTransitionAction, snapCarouselX } from './navigation'
import { products } from '../data/products'
import { NAV_ITEMS } from '../constants/navigation'

describe('getTransitionAction', () => {
  it('returns null when the path does not change', () => {
    expect(getTransitionAction('/', '/')).toBeNull()
    expect(getTransitionAction('/products', '/products')).toBeNull()
  })

  it('opens the products view when navigating to /products', () => {
    expect(getTransitionAction('/', '/products')).toBe('open-products')
    expect(getTransitionAction('/about', '/products')).toBe('open-products')
  })

  it('closes products and restores the hero for any other destination', () => {
    expect(getTransitionAction('/products', '/')).toBe('close-products')
    expect(getTransitionAction('/products', '/locations')).toBe('close-products')
    expect(getTransitionAction('/', '/news')).toBe('close-products')
  })
})

describe('snapCarouselX', () => {
  it('snaps to the nearest item width multiple', () => {
    expect(snapCarouselX(-120, 350)).toBe(0)
    expect(snapCarouselX(-200, 350)).toBe(-350)
    expect(snapCarouselX(-520, 350)).toBe(-350)
    expect(snapCarouselX(-700, 350)).toBe(-700)
  })

  it('returns 0 when item width is missing', () => {
    expect(snapCarouselX(-100, 0)).toBe(0)
  })
})

describe('formatPrice', () => {
  it('formats prices with two decimal places', () => {
    expect(formatPrice(4.5)).toBe('4.50')
    expect(formatPrice(4)).toBe('4.00')
  })
})

describe('catalog data', () => {
  it('exposes a non-empty product list with required fields', () => {
    expect(products.length).toBeGreaterThan(0)
    for (const product of products) {
      expect(product.title).toBeTruthy()
      expect(product.image).toMatch(/^\//)
      expect(typeof product.price).toBe('number')
      expect(product.rating).toBeGreaterThanOrEqual(1)
      expect(product.rating).toBeLessThanOrEqual(5)
    }
  })

  it('defines the expected primary nav destinations', () => {
    expect(NAV_ITEMS.map((item) => item.path)).toEqual([
      '/products',
      '/locations',
      '/news',
      '/about',
      '/contact',
    ])
  })
})
