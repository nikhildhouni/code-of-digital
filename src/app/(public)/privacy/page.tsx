import { getPageSeo } from '@/lib/seo'

export async function generateMetadata() {
    return await getPageSeo('privacy')
}

export default function PrivacyPage() {
    return (
        <main className="bg-background text-black min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose max-w-none space-y-6 text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black">
                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">1. Information We Collect</h2>
                    <p className="leading-relaxed">
                        We may collect personal identification information from users in various ways, including, but not limited to, when users visit our site, register on the site, place an order, fill out a form, and in connection with other activities, services, features, or resources we make available on our site. Users may be asked for name, email address, mailing address, and phone number.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">2. How We Use Collected Information</h2>
                    <p className="leading-relaxed">
                        Code Of Digital may collect and use users' personal information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To improve customer service.</li>
                        <li>To personalize user experience.</li>
                        <li>To process payments and transactions.</li>
                        <li>To send periodic emails and updates regarding user orders or inquiries.</li>
                    </ul>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">3. How We Protect Your Information</h2>
                    <p className="leading-relaxed">
                        We adopt appropriate data collection, storage, processing practices, and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">4. Sharing Your Personal Information</h2>
                    <p className="leading-relaxed">
                        We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">5. Contacting Us</h2>
                    <p className="leading-relaxed">
                        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <br />
                        <strong>Email:</strong> codeofdigital5@gmail.com <br />
                        <strong>Address:</strong> Shahdara, Delhi, 110032 <br />
                        <strong>Phone:</strong> +91 95365 03327
                    </p>
                </div>
            </div>
        </main>
    )
}
