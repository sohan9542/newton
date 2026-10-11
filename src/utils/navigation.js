/**
 * Decide which page transition to run when the in-page tab path changes.
 * Returns null when the path is unchanged (no animation).
 *
 * @param {string} currentPath
 * @param {string} nextPath
 * @returns {'open-products' | 'close-products' | null}
 */
export function getTransitionAction(currentPath, nextPath) {
  if (currentPath === nextPath) {
    return null
  }

  if (nextPath === '/products') {
    return 'open-products'
  }

  return 'close-products'
}

/**
 * Snap a drag offset to the nearest carousel item boundary.
 *
 * @param {number} x
 * @param {number} itemWidth
 * @returns {number}
 */
export function snapCarouselX(x, itemWidth) {
  if (!itemWidth) {
    return 0
  }

  const snapped = Math.round(x / itemWidth) * itemWidth
  return Object.is(snapped, -0) ? 0 : snapped
}

/**
 * Format a product price for display (e.g. 4.5 → "4.50").
 *
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  return Number(price).toFixed(2)
}
