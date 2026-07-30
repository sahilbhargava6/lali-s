"use client";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-black text-[#111111] mb-6">Privacy <span className="text-[#D22027]">Policy</span></h1>
        <p className="text-gray-500 mb-12">Last Updated: August 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
           <section>
             <h2 className="text-2xl font-bold text-[#111111] mb-4">1. Introduction</h2>
             <p>Welcome to Lalisons Buildmart. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
           </section>

           <section>
             <h2 className="text-2xl font-bold text-[#111111] mb-4">2. The Data We Collect About You</h2>
             <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
             <ul className="list-disc pl-6 mt-4 space-y-2">
               <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
               <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
               <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
             </ul>
           </section>

           <section>
             <h2 className="text-2xl font-bold text-[#111111] mb-4">3. How We Use Your Personal Data</h2>
             <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
             <ul className="list-disc pl-6 mt-4 space-y-2">
               <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling a bulk order).</li>
               <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
               <li>Where we need to comply with a legal obligation.</li>
             </ul>
           </section>

           <section>
             <h2 className="text-2xl font-bold text-[#111111] mb-4">4. Data Security</h2>
             <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
           </section>

           <section>
             <h2 className="text-2xl font-bold text-[#111111] mb-4">5. Contact Us</h2>
             <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
             <p className="mt-4">
                <strong>Lalisons Buildmart</strong><br/>
                Near ITI, Dari, Dharamshala,<br/>
                Himachal Pradesh, 176057<br/>
                Email: lalisbuildmart@gmail.com
             </p>
           </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
           <Link href="/" className="font-bold text-[#D22027] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
