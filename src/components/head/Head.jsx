import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoData from '../../data/seo.json'

/**
 * @typedef {{
 *   categories: {
 *     id: string,
 *     description: string,
 *     trainings: {
 *       type: string,
 *       title: string,
 *       pricing?: { individualPrice?: number, groupPrice?: number | string }[]
 *     }[]
 *   }[]
 * }} TrainingsData
 */

/** @type {TrainingsData} */
import trainings from '../../data/training.json'

export default function Head() {
    const { pathname } = useLocation()

    /**
     * @type {{ title?: string, description?: string, keywords?: string, canonical?: string }}
     */
    const meta = seoData[pathname] || seoData['/']

    useEffect(() => {
        if (!meta) return

        // 🧩 Basis meta
        document.title = meta.title || 'BHV Voorne aan Zee'
        updateTag('meta[name="description"]', 'content', meta.description)
        updateTag('meta[name="keywords"]', 'content', meta.keywords)
        updateLink('link[rel="canonical"]', meta.canonical)

        // 🌐 Open Graph (social previews)
        updateTag('meta[property="og:title"]', 'content', meta.title)
        updateTag('meta[property="og:description"]', 'content', meta.description)
        updateTag('meta[property="og:url"]', 'content', meta.canonical)
        updateTag('meta[property="og:type"]', 'content', 'website')
        updateTag('meta[property="og:site_name"]', 'content', 'BHV Voorne aan Zee')

        // 🧱 Structured Data (schema.org)
        const schemas = [
            createLocalBusinessSchema(),
            createOrganizationSchema(),
            createContactPointSchema(),
            ...getCourseSchemas(pathname)
        ]

        injectJSONLD({ '@graph': schemas })
    }, [pathname, meta]) // ✅ dependency array compleet

    return null
}

/* ------------------------------------------ */
/* 🔧 Helpers                                 */
/* ------------------------------------------ */

function updateTag(selector, attr, value) {
    let tag = document.head.querySelector(selector)
    if (!tag) {
        tag = document.createElement('meta')
        // ✅ Regex fix: backslash verwijderd
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

/* ------------------------------------------ */
/* 🏢 LocalBusiness schema                    */
/* ------------------------------------------ */
function createLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'BHV Voorne aan Zee',
        image: 'https://www.bhvvoorneaanzee.nl/assets/image/logo.png',
        url: 'https://www.bhvvoorneaanzee.nl',
        telephone: '+31-641719800',
        email: 'mailto:algemeen@bhvvoorneaanzee.nl',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Druivenhoek 12',
            postalCode: '3181 PK',
            addressLocality: 'Rozenburg',
            addressCountry: 'NL'
        },
        areaServed: [
            'Gemeente Voorne aan Zee',
            'Regio Rotterdam-Rijnmond',
            'Regio Haaglanden',
            'Provincie Zeeland',
            'Provincie Noord-Brabant (Midden & West, tot Breda)'
        ],
        openingHours: 'Mo-Fr 08:00-17:00',
        sameAs: ['https://www.linkedin.com/company/bhvvoorneaanzee/']
    }
}

/* ------------------------------------------ */
/* 🧾 Organization schema                     */
/* ------------------------------------------ */
function createOrganizationSchema() {
    return {
        '@type': 'Organization',
        name: 'BHV Voorne aan Zee',
        url: 'https://www.bhvvoorneaanzee.nl',
        logo: 'https://www.bhvvoorneaanzee.nl/assets/image/logo.png',
        sameAs: ['https://www.linkedin.com/company/bhvvoorneaanzee/'],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+31-641719800',
            contactType: 'customer service',
            areaServed: ['Nederland'],
            availableLanguage: ['Dutch']
        }
    }
}

/* ------------------------------------------ */
/* ☎️ ContactPoint schema                     */
/* ------------------------------------------ */
function createContactPointSchema() {
    return {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+31-641719800',
        email: 'mailto:algemeen@bhvvoorneaanzee.nl',
        availableLanguage: ['Dutch'],
        areaServed: [
            'Gemeente Voorne aan Zee',
            'Regio Rotterdam-Rijnmond',
            'Regio Haaglanden',
            'Provincie Zeeland',
            'Provincie Noord-Brabant (Midden & West, tot Breda)'
        ]
    }
}

/* ------------------------------------------ */
/* 🎓 Course schemas (automatisch)            */
/* ------------------------------------------ */
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
                        name: 'BHV Voorne aan Zee',
                        url: 'https://www.bhvvoorneaanzee.nl'
                    },
                    hasCourseInstance: {
                        '@type': 'CourseInstance',
                        name: training.title,
                        courseMode: training.type,
                        offers: {
                            '@type': 'Offer',
                            price: price,
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
