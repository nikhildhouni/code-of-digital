import { getBlogPostSeo } from '@/lib/seo'
import ClientPage from './client'
import { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug
    return await getBlogPostSeo(slug)
}

export default function Page() {
    return <ClientPage />
}
