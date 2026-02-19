import DOMPurify from 'dompurify'

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Especially important for rendering curriculum content or user inputs.
 */
export function sanitizeHTML(html: string): string {
    if (typeof window === 'undefined') return html // Server-side bypass (or use jsdom)
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'blockquote'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'id']
    })
}
