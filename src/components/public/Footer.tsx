import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-background text-foreground pt-24 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-border">
            <div className="max-w-7xl mx-auto">
                {/* Top Section: CTA and Graphic */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
                    <div className="flex-1">
                        <Link href="/contact" className="group">
                            <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black uppercase tracking-tighter flex items-end gap-4">
                                Let's Create <br /> Together
                                <span className="mb-[2vw] rounded-xl border-2 border-foreground p-3 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
                                </span>
                            </h2>
                        </Link>
                    </div>

                    {/* Stacked Graphic Placeholder (Code-based) */}
                    <div className="relative w-full md:w-[400px] aspect-[4/3] flex items-center justify-center">
                        <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-muted rounded-3xl rotate-[-5deg] shadow-xl border border-border"></div>
                        <div className="absolute top-4 right-4 w-4/5 h-4/5 bg-muted/80 rounded-3xl rotate-[-2deg] shadow-xl border border-border"></div>
                        <div className="absolute top-8 right-8 w-4/5 h-4/5 bg-foreground rounded-3xl rotate-[0deg] shadow-2xl overflow-hidden border border-border">
                            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-black flex items-center justify-center p-8 text-center text-primary font-black text-4xl uppercase select-none">
                                CODE OF DIGITAL
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-border pb-12">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40">Visit Us</h4>
                        <address className="not-italic text-lg md:text-xl font-medium max-w-xs leading-relaxed">
                            7814 Harrison Blvd. Wilmington, <br />
                            19804 United States
                        </address>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40">Contact Us</h4>
                        <div className="space-y-2 text-lg md:text-xl font-medium">
                            <p className="hover:text-primary transition-colors"><a href="mailto:hello@codeofdigital.com">hello@codeofdigital.com</a></p>
                            <p className="hover:text-primary transition-colors"><a href="tel:+12345678910">+1 (234) 567-8910</a></p>
                        </div>
                    </div>

                    <div className="flex items-end justify-start md:justify-end gap-6">
                        <Link href="#" className="hover:text-primary hover:scale-110 transition-all"><Instagram className="w-6 h-6" /></Link>
                        <Link href="#" className="hover:text-primary hover:scale-110 transition-all"><Youtube className="w-6 h-6" /></Link>
                        <Link href="#" className="hover:text-primary hover:scale-110 transition-all"><Linkedin className="w-6 h-6" /></Link>
                        <Link href="#" className="hover:text-primary hover:scale-110 transition-all"><Twitter className="w-6 h-6" /></Link>
                    </div>
                </div>

                {/* Bottom Section: Legal and Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium pt-4 opacity-50 uppercase tracking-widest">
                    <p>
                        © {new Date().getFullYear()} Code Of Digital - All right reserved
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
                        <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="/refund" className="hover:text-primary">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
