import { getPageSeo } from '@/lib/seo'

export async function generateMetadata() {
    return await getPageSeo('terms')
}

export default function TermsPage() {
    return (
        <main className="bg-background text-black min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Terms & Conditions</h1>
                    <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose max-w-none space-y-6 text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black">
                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">1. Introduction</h2>
                    <p className="leading-relaxed">
                        Welcome to Code Of Digital. These Terms and Conditions govern your use of our website and services.
                        By accessing or using our services, you agree to be bound by these terms.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">2. Services</h2>
                    <p className="leading-relaxed">
                        Code Of Digital provides digital services including but not limited to Web Development, App Development, UI/UX Design, and Digital Marketing.
                        All services provided are subject to individual project agreements and proposals.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">3. Intellectual Property</h2>
                    <p className="leading-relaxed">
                        Unless otherwise stated, Code Of Digital owns the intellectual property rights for all material on our website.
                        Upon project completion and full payment, intellectual property rights for custom-developed work are transferred to the client.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">4. Payment Terms</h2>
                    <p className="leading-relaxed">
                        Payments for services are outlined in the respective proposals or invoices.
                        Failure to meet payment schedules may result in a suspension of services.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">5. Limitation of Liability</h2>
                    <p className="leading-relaxed">
                        In no event shall Code Of Digital, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website or our services.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">6. Contact Information</h2>
                    <p className="leading-relaxed">
                        For any inquiries regarding these terms, please contact us at: <br />
                        <strong>Email:</strong> codeofdigital5@gmail.com <br />
                        <strong>Address:</strong> Shahdara, Delhi, 110032 <br />
                        <strong>Phone:</strong> +91 95365 03327
                    </p>
                </div>
            </div>
        </main>
    )
}
