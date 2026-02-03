import { getPageSeo } from '@/lib/seo'
import ClientPage from './client'

export async function generateMetadata() {
    return await getPageSeo('pricing')
}

export default function Page() {
    return <ClientPage />
}
