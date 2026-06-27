import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dasar Privasi",
  description: `Dasar privasi ${siteConfig.name}.`,
};

export default function DasarPrivasiPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold text-brand-900">Privacy Policy</h1>

      <div className="mt-8 space-y-6 text-brand-900/80">
        <div>
          <h2 className="font-bold text-brand-900">External Website</h2>
          <p className="mt-2">
            {siteConfig.name}.my website may include connections to external websites
            or materials beyond its control for the advantage of users. As a result,{" "}
            {siteConfig.name}.my accepts no responsibility for content on websites
            other than the {siteConfig.name}.my website.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Log Files</h2>
          <p className="mt-2">
            {siteConfig.name}.my employs a common technique for using log files.
            These files keep track of who visits which websites. All hosting
            providers do this, and it is part of the hosting services&apos;
            analytics. Log files gather information such as IP addresses, browser
            type, Internet Service Provider (ISP), date and time stamp,
            referring/exit sites, and potentially the number of clicks. These do not
            contain any personally identifiable information. The information is used
            to analyze trends, administer the site, track user movement on the
            website, and collect demographic statistics.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Cookies</h2>
          <p className="mt-2">
            {siteConfig.name}.my employs &apos;cookies&apos;. These cookies are used
            to keep information about visitors, such as their preferences and the
            pages on the website that they accessed or viewed. The data provided is
            used to improve the user experience by tailoring our web page content to
            visitors&apos; browser types and/or any additional data. You can disable
            cookies through your browser&apos;s settings.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Third Party Policy</h2>
          <p className="mt-2">
            The Privacy Policy of {siteConfig.name}.my does not apply to any
            advertisers or websites. For additional information, we recommend that
            you review the Privacy Policies of these third-party ad servers. It may
            include their policies and information on how to opt out of specific
            alternatives.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Children Information</h2>
          <p className="mt-2">
            Our objective is to provide safe and useful online learning as well as
            protecting the youngsters while they use the internet. We advise parents
            and guardians to monitor, participate in, and/or manage their
            children&apos;s online activities.
          </p>
          <p className="mt-2">
            {siteConfig.name}.my does not intentionally collect personally
            identifiable information from minors under the age of thirteen. If you
            believe your child disclosed this type of data on our website, we
            recommend you contact us right away, and we will make every effort to
            erase it from our records.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Privacy Policy</h2>
          <p className="mt-2">
            This Privacy Policy only relates to our online operations and is
            applicable to visitors to our website and the information they provide
            and/or gather on {siteConfig.name}.my. This policy does not apply to
            information acquired offline or through channels other than this
            website.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-brand-900">Consent</h2>
          <p className="mt-2">
            By using our website, you hereby consent to our Privacy Policy and agree
            to its Terms and Conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
