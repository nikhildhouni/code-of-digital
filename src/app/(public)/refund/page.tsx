import { getPageSeo } from '@/lib/seo'

export async function generateMetadata() {
    return await getPageSeo('refund')
}

export default function RefundPage() {
    return (
        <main className="bg-background text-black min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Refund Policy</h1>
                    <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose max-w-none space-y-6 text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black">
                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">1. General Policy</h2>
                    <p className="leading-relaxed">
                        At Code Of Digital, we strive to ensure that our clients are satisfied with the digital services we provide.
                        Because our services (e.g., Web Development, App Development, Design) require significant investment of time, resources, and human capital, refunds are granted under specific conditions as outlined below.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">2. Eligibility for Refunds</h2>
                    <p className="leading-relaxed">
                        Refunds may be considered in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The project has not been initiated after the initial payment is made and a refund is requested within 7 days.</li>
                        <li>We fail to deliver the agreed-upon milestones or scope of work as per the final approved proposal and contract.</li>
                    </ul>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">3. Non-refundable Services</h2>
                    <p className="leading-relaxed">
                        Certain services are strictly non-refundable once the work has been initiated:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Domain registrations and SSL certificates.</li>
                        <li>Third-party plugin, software, or API licenses purchased on your behalf.</li>
                        <li>Any completed milestone or phase of development already approved by the client.</li>
                        <li>Digital marketing campaigns and advertising spend once deployed.</li>
                    </ul>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">4. Process for Requesting a Refund</h2>
                    <p className="leading-relaxed">
                        To request a refund, clients must submit an email detailing the reason for the request along with relevant documentation.
                        Our team will review the request and respond within 7-10 business days. Approved refunds will be issued to the original payment method.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-widest mt-8">5. Contacting Us</h2>
                    <p className="leading-relaxed">
                        If you have any questions about this Refund Policy, please contact us at: <br />
                        <strong>Email:</strong> codeofdigital5@gmail.com <br />
                        <strong>Address:</strong> Shahdara, Delhi, 110032 <br />
                        <strong>Phone:</strong> +91 95365 03327
                    </p>
                </div>
            </div>
        </main>
    )
}
