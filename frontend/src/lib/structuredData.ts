export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  logo: string
  contactPoint: {
    '@type': string
    email: string
    contactType: string
  }
}

export interface WebApplicationSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    '@type': string
    price: string
    priceCurrency: string
  }
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StudentSathi',
    description: 'AI-powered student engagement tracking and analytics platform for educators',
    url: 'https://studentsathi.com',
    logo: 'https://studentsathi.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@studentsathi.com',
      contactType: 'Customer Service',
    },
  }
}

export function generateWebApplicationSchema(): WebApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'StudentSathi',
    description: 'AI-powered student engagement tracking and analytics platform for educators',
    url: 'https://studentsathi.com',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
