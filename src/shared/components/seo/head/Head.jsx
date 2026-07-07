import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoData from '@/shared/data/seo.json'
import localBusinessData from '@/shared/data/localBusiness.json'

/**
 * @typedef {{
 *   categories: {
 *     id: string,
 *     description: string,
 *     trainings: {
 *       type: string,
 *       title: string,
 *       price?: number | string,
 *       pricing?: { individualPrice?: number, groupPrice?: number | string }[]
 *     }[]
 *   }[]
 * }} TrainingsData
 */

/** @type {TrainingsData} */
import trainings from '@/shared/data/training.json'

const SITE_URL = 'https://bhvvoorneaanzee.nl'
const LOGO_URL = `${SITE_URL}/assets/image/logo.png`

export default function Head() {
    const { pathname } = useLocation()

    /**
     * @type {{ title?: string, description?: string, keywords?: string, canonical?: string }}
     */
    const meta = seoData[pathname] || seoData['/']

    useEffect(() => {
        if (!meta) return

        updateDocumentMeta(meta)

        const schemas = [
            createLocalBusinessSchema(),
            createOrganizationSchema(),
            createContactPointSchema(),
            ...getCourseSchemas(pathname)
        ]

        injectJSONLD({ '@context': 'https://schema.org', '@graph': schemas })
    }, [pathname, meta])

    return null
}

function updateDocumentMeta(meta) {
    document.title = meta.title || 'BHV Voorne aan Zee'
    updateTag('meta[name="description"]', 'content', meta.description)
    updateTag('meta[name="keywords"]', 'content', meta.keywords)
    updateLink('link[rel="canonical"]', meta.canonical)

    updateTag('meta[property="og:title"]', 'content', meta.title)
    updateTag('meta[property="og:description"]', 'content', meta.description)
    updateTag('meta[property="og:url"]', 'content', meta.canonical)
    updateTag('meta[property="og:type"]', 'content', 'website')
    updateTag('meta[property="og:site_name"]', 'content', 'BHV Voorne aan Zee')
}

function updateTag(selector, attr, value) {
    let tag = document.head.querySelector(selector)
    if (!tag) {
        tag = document.createElement('meta')
        const match = selector.match(/meta\[(?:name|property)="([^"]+)"]/)
        if (match) tag.setAttribute(match[1].startsWith('og:') ? 'property' : 'name', match[1])
        document.head.appendChild(tag)
    }
    tag.setAttribute(attr, value || '')
}

function updateLink(selector, href) {
    let link = document.head.querySelector(selector)
    if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
    }
    link.setAttribute('href', href || '')
}

function injectJSONLD(json) {
    let script = document.head.querySelector('script[type="application/ld+json"]')
    if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(json)
}

function createLocalBusinessSchema() {
    const { '@context': _context, ...schema } = localBusinessData

    return {
        ...schema,
        '@id': `${SITE_URL}/#localbusiness`,
        url: SITE_URL,
        logo: LOGO_URL,
        image: LOGO_URL
    }
}

function createOrganizationSchema() {
    return {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'BHV Voorne aan Zee',
        url: SITE_URL,
        logo: LOGO_URL,
        sameAs: localBusinessData.sameAs,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: localBusinessData.telephone,
            email: localBusinessData.email,
            contactType: 'customer services',
            areaServed: ['NL'],
            availableLanguage: ['nl-NL']
        }
    }
}

function createContactPointSchema() {
    return {
        '@type': 'ContactPoint',
        contactType: 'customer services',
        telephone: localBusinessData.telephone,
        email: localBusinessData.email,
        availableLanguage: ['nl-NL'],
        areaServed: localBusinessData.areaServed
    }
}

function getCourseSchemas(pathname) {
    const result = []

    trainings.categories.forEach((category) => {
        if (pathname.includes(category.id)) {
            category.trainings.forEach((training) => {
                const price =
                    training.price ||
                    training.pricing?.[0]?.individualPrice ||
                    training.pricing?.[0]?.groupPrice ||
                    'Op aanvraag'

                result.push({
                    '@type': 'Course',
                    name: training.title,
                    description: category.description,
                    provider: {
                        '@type': 'Organization',
                        '@id': `${SITE_URL}/#organization`,
                        name: 'BHV Voorne aan Zee',
                        url: SITE_URL
                    },
                    hasCourseInstance: {
                        '@type': 'CourseInstance',
                        name: training.title,
                        courseMode: training.type,
                        offers: {
                            '@type': 'Offer',
                            price,
                            priceCurrency: 'EUR',
                            availability: 'https://schema.org/InStock'
                        }
                    }
                })
            })
        }
    })

    return result
}
