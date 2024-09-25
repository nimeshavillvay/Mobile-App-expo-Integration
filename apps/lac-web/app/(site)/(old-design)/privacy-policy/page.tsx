import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container">
      <MainTitle className="mt-8">Privacy Policy</MainTitle>

      <div className="text-brand-gray-500 [&>h2]:mb-4 [&>h2]:mt-10 [&>p]:mb-4 [&>ul]:mb-4">
        <p>
          If you are vision-impaired or have some other impairment covered by
          the Americans with Disabilities Act or a similar law, and you wish to
          discuss potential accommodations related to using this website, please
          contact Wurth Louis and Company Customer Service at{" "}
          <a
            href="tel:8004224389"
            className="btnAction text-blue-500 hover:text-blue-900 hover:underline"
            data-btn-action="Click Privacy Policy Phone"
          >
            (800) 422-4389
          </a>
          , and/or email <strong>CService@wurthlac.com</strong>.
        </p>

        <p>
          We have created this Privacy Notice in order to demonstrate our
          commitment to privacy, and to describe our policies and practices with
          respect to the collection and use of your personal information. We
          recognize that our customers value knowing how their personal
          information is used and shared. This Privacy Notice includes our
          information gathering and dissemination practices for the{" "}
          <a
            href="http://www.wurthlac.com"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View Home"
          >
            www.wurthlac.com
          </a>{" "}
          including information gathered at the Würth Louis and Company online
          catalog or any other areas of the Website.
          <strong>
            By using the Website and accessing our goods or Services (as defined
            below), in any manner, you acknowledge that you accept the practices
            described in this Privacy Notice, and that you consent to the
            collection, use and sharing of your information in the ways
            described in this Privacy Notice.
          </strong>{" "}
          This Privacy Notice explains how we may collect, use, and/or disclose
          your personally identifiable information (&quot;Personal
          Information&quot;) that we obtain through the Website, mobile
          applications, through our catalogs, our pick up locations, Wurth on
          Wheels Sales Vans, sample sales, and warehouse sales (collectively,
          our &quot;<strong>Services</strong>&quot;). All other terms not
          defined herein will have the meanings set forth in the{" "}
          <a
            href="/terms-of-sale"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View Terms of Sale"
          >
            Terms of Sale
          </a>
          .
        </p>

        <p>
          This Privacy Notice applies to the United States only. We recognize
          that privacy is an ongoing responsibility, and we will update this
          Privacy Notice as we undertake new personal data practices or adopt
          new privacy policies. You agree that any dispute over privacy or the
          terms contained in this Privacy Notice, our{" "}
          <a
            href="/terms-of-sale"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View Terms of Sale"
          >
            Terms of Sale
          </a>
          , or any other agreement we have with you, will be governed by the
          laws of California. You also agree to arbitrate such disputes in
          California, through the American Arbitration Association, in
          accordance with its commercial rules of arbitration then in effect,
          and to abide by any limitation on damages contained in any agreement
          we may have with you.
        </p>

        <h2 className="font-extrabold">
          What Information is Collected and Stored?
        </h2>

        <p>
          We collect and store certain information automatically whenever you
          access the Services. The amount and type of information we collect
          depends upon the Services you use. For example, when you access the
          Website, we collect your IP address, browser information and related
          information. We also collect information regarding traffic patterns
          and Website usage. This information is used to analyze and improve the
          Website and to provide customers with an improved ordering experience.
        </p>

        <p>
          We may ask you for Personal Information when you register and use the
          Website. This information enables us to contact you and provide
          information regarding the Services we offer, including new products
          and Services that we may introduce from time to time, and to enable
          customers to obtain product literature, receive online newsletters, or
          access restricted areas of the Website.
        </p>

        <p>
          We collect and store information that you enter through this Website
          or otherwise. For example, when you open an account or place an order
          with us, we collect and store some or all of the following
          information: your name, billing address, shipping address, email
          address, telephone number, fax number, credit card numbers and
          expiration dates, banking information, and social security or other
          tax identification number. We may also collect information from other
          sources, such as credit bureaus and delivery services in order to
          provide our Services. Any and all information collected is used to
          provide the products and Services that you order or request, to
          process and ship orders, to send order and shipping confirmations and
          to provide customer service, report and file tax and other information
          to state tax agencies, validate customer base against sanctions lists,
          and ensure compliance with various segments of our business. In order
          to ship and track product orders, we make your name and address
          information available to common carriers and courier services.
          Information we collect also may be used by us to contact you about
          products, promotions, upcoming events, special offers and new Website
          features. Each time a visitor comes to the Website or otherwise
          accesses our Services, we may count, track and aggregate the
          visitor&apos;s activity into an analysis of general traffic flows at
          the Website.
        </p>

        <p>
          <strong>Is Personal Information Shared with Third Parties?</strong> We
          do not sell or rent to others any Personal Information that you
          provide to us through this Website, except with your consent or as
          described in this Privacy Notice. We do not share Personal Information
          with third parties except we may share Personal Information with the
          following people for the following reasons:
        </p>

        <ul>
          <li className="ml-4 list-outside list-disc">
            <strong>Our affiliates:</strong> meaning our parent company, Adolph
            Würth GmbH & Co, and any organization that, directly or indirectly
            through one or more intermediaries, that we or it controls. Any of
            those organizations may use your Personal Information in the same
            way as we can under this Privacy Notice.
          </li>
          <li className="ml-4 list-disc">
            <strong>Third parties at your request:</strong> You may choose to
            share your activities on the Website with others through email, text
            or on various social media networks.
          </li>
          <li className="ml-4 list-disc">
            <strong>
              Select third parties for purposes of providing you with
              information and marketing messages about products or Services that
              may interest you.
            </strong>
          </li>
          <li className="ml-4 list-disc">
            <strong>Service providers:</strong> third party vendors and other
            service providers that perform services for us on our behalf, which
            may include providing targeted advertisements, providing mailing,
            fax or email services, order fulfillment and shipping, delivery
            scheduling, marketing and promotional material distribution, data
            enhancement services, fraud prevention, web hosting, or providing
            analytic services.
          </li>
          <li className="ml-4 list-disc">
            <strong>Product Suppliers:</strong> third party product suppliers to
            us or our affiliates who may have a legitimate business or legal
            interest in receiving such information. For example, Personal
            Information may be shared with product suppliers to fulfill warranty
            service obligations, drop ship transactions, product recalls, or
            transaction tracking regarding shipments or leases of the
            supplier&apos;s products.
          </li>
          <li className="ml-4 list-disc">
            <strong>The public:</strong> when you provide feedback or post user
            content on our Website. For example, if you post a product review on
            our Website or a comment on our social media sites, your
            information, such as your first name, last initial, state of
            residence, and your comments, may appear on our Website or on our
            social media pages.
          </li>
          <li className="ml-4 list-disc">
            <strong>
              Purchasers and third parties in connection with a business or
              legal transaction
            </strong>
            , such as a merger, change of control or acquisition of all or a
            portion of our business by an affiliate or third party, or in the
            event of a bankruptcy or related or similar proceedings.
          </li>
          <li className="ml-4 list-disc">
            <strong>
              Law enforcement, regulators and other parties for legal reasons
            </strong>{" "}
            as required by law or subpoena or if we reasonably believe that such
            action is necessary to (a) comply with the law and the reasonable
            requests of law enforcement; (b) to enforce our{" "}
            <a
              href="/terms-of-sale"
              target="_blank"
              className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
              data-btn-action="View Terms of Sale"
            >
              Terms of Sale
            </a>{" "}
            or to protect the security or integrity of our Services; and/or (c)
            to exercise or protect the rights, property, or personal safety of
            us and our affiliates, or others.
          </li>
          <li className="ml-4 list-disc">
            <strong>Fraud Prevention and Credit Risks.</strong> We may use
            Personal Information to prevent and detect fraud and abuse in order
            to protect the security of our customers, and others. We may also
            use scoring methods to assess and manage credit risks.
          </li>
        </ul>

        <h2 className="font-extrabold">Links</h2>

        <p>
          We may re-direct you to a YouTube channel (
          <a
            href="https://policies.google.com/privacy?hl=en"
            rel="noopener noreferrer"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View YouTube Privacy Notice"
          >
            YouTube Privacy Notice
          </a>
          ).
        </p>

        <p>
          We are not responsible for the privacy notices or policies applicable
          to other websites or how they may treat information about their users.
          Advertisers on the Website or other websites to which our customers
          link may have the ability to assign cookies in a process not under our
          control. We have no control over the use of the information collected
          by linked websites or others.
        </p>

        <h2 className="font-extrabold">
          Is Information Collected from Children?
        </h2>

        <p>
          We do not knowingly collect, use, or share Personal Information from
          children under the age of 16. Please immediately Contact Us if you
          become aware that a child under 16 has provided us with Personal
          Information so that we may investigate and delete information as may
          be appropriate.
        </p>

        <h2 className="font-extrabold">Other Circumstances</h2>

        <p>
          From time to time, we may sponsor promotional events which require the
          collection, processing and storing of individual contact and
          demographic information to be used for the event. We may also
          co-sponsor these activities with other organizations. We may merge
          information about you which may then be shared on an aggregated basis
          with co-sponsors, advertisers and our affiliates. Your Personal
          Information will not be released by us to co-sponsoring third parties
          or non-participating organizations without your consent and, although
          we may request that co-sponsors of such events uphold the privacy of
          your Personal Information, we have no liability where the co-sponsors
          do not comply with our requests.
        </p>

        <p>
          An option may be made available for users during the event
          registration process to choose to receive information from third-party
          organizations.
        </p>

        <h2 className="font-extrabold">How Can Information Be Corrected?</h2>

        <p>
          If you would like to have us correct or update your Personal
          Information, please send your corrections or updates to{" "}
          <strong>websupport@wurthlac.com</strong>.
        </p>

        <h2 className="font-extrabold">
          What Steps Are Taken to Protect Personal Information?
        </h2>

        <p>
          The Website has security measures in place to protect the loss, misuse
          and alteration of Personal information under our control. We use
          reasonable industry standard procedures and processes to safeguard the
          confidentiality of Personal Information including encryption of
          Personal Information prior to transmission over the Internet. The
          Website uses secure socket layer (&quot;SSL&quot;) encryption
          technology provided by RapidSSL, and GeoTrust. Users of the Website
          should ensure that their browsers support SSL encryption technology.
          However, when you submit information over the Internet, the
          information may travel over many systems not under our control. Others
          may intercept the information you send. To protect Personal
          Information, you should take appropriate steps to guard your password
          and close your browser when away from your computer or other device.
          You may change your password or may request a new password from us. If
          you or any visitor to the Website becomes aware of any loss, theft or
          unauthorized use of a password, please notify us immediately by
          sending an e-mail message to <strong>websupport@wurthlac.com</strong>.
        </p>

        <h2 className="font-extrabold">California Residents</h2>

        <p>
          As of January 1, 2020, California Civil Code Section 1798.100-199,
          provides California residents with certain rights with respect to our
          use and disclosure of your Personal Information. If you are a
          California resident, you have the following rights:
        </p>

        <ul className="ml-4 list-outside list-disc">
          <li>
            Right of Access | Right to Notice: California residents have the
            right to request from us: the categories of Personal Information we
            have collected about you, the categories of sources from which the
            Personal Information is collected, the business purpose or
            commercial purpose for collecting the Personal Information, the
            categories of third parties with whom we share Personal Information,
            the categories of Personal Information we have shared and the
            reasons we shared it and a copy of the specific pieces of Personal
            Information we have collected about you in the preceding 12 months.
          </li>
          <li>
            Right of Deletion: California residents have the right to request
            that we delete the Personal Information we collect from you.
            However, in certain situations we are not required to delete your
            Personal Information, such as when the information is necessary in
            order to complete the transaction for which the Personal Information
            was collected, to provide a good or Service requested by you, to
            comply with a legal obligation, to engage in research, to secure our
            Websites or other online services, or to otherwise use your Personal
            Information internally in a lawful manner that is compatible with
            the context in which you provided the information.
          </li>
          <li>
            Right Not to Be Subject to Discrimination. Should you exercise any
            of your privacy rights as a California consumer, we will not
            discriminate against you by offering you different pricing or
            products, or by providing you with a different level or quality of
            Services. However, in some circumstances, for example where you have
            requested or consented to our Services that use your Personal
            Information to provide the service, we may not be able to provide a
            Service if you choose to delete your Personal Information.
          </li>
        </ul>

        <p>
          To manage your rights as a California resident, concerning our sharing
          of your Personal Information with such companies, see California
          Privacy Rights Management Portal (&quot;Rights Request&quot; form).
          You may object to the sharing Personal Information, by clicking the{" "}
          <em className="uppercase underline">
            do not sell my personal information
          </em>
          , link at the bottom of each page of the Website, by accessing our{" "}
          <em className="underline">Rights Request</em> form, or by emailing{" "}
          <strong>privacy@wurthlac.com</strong> with &quot;Rights Request&quot;
          on the subject line and in the body of your message. Please note that
          if substantially all of Wurth Louis and Company assets are acquired by
          a third party, your Personal Information may be included as part of
          the transferred assets.
        </p>

        <p>
          When you submit a Rights Request as a California resident through one
          of these designated methods, we will use the information you submit
          and the information we have in our systems to try to verify your
          identity and to match the Personal Information we have collected about
          you, if any, to your identity. If we are successful in validating your
          identity, we will respond to your request within the time and in the
          manner required by law. If we cannot validate your identity, we will
          attempt to contact you to inform you of this issue.{" "}
          <span className="underline">
            Please note that we are only required to respond to each California
            resident&apos;s Rights Request twice in any given 12-month period
          </span>
          .
        </p>

        <h2 className="font-extrabold">Cookies and Similar Technologies</h2>

        <p>
          Please note that &quot;cookies&quot; are files stored on a user&apos;s
          hard drive by the browser. We and our Service providers, advertisers,
          and other third parties use cookies and similar technologies (for
          example. HTTP cookies, and HTML 5) to recognize you on, off, and
          across the Services and your devices (&quot;Technologies&quot;).
        </p>

        <p>
          When you use our Service, we automatically collect information about
          how you access and use the Service and information about the device
          you use to access the Service. We use this information to enhance and
          personalize your user experience, to monitor and improve our websites
          and Services, and for other internal purposes.
        </p>

        <p>
          You may disable cookies and other Technologies through the settings in
          your browser.
        </p>

        <h2 className="font-extrabold">Mobile App and Connected Devices</h2>

        <p>
          Depending on the device you use, you may be able to manage your
          advertising and location preferences through your device settings and
          as outlined in our Cookies Notice. Many operating systems provide
          their own instructions on how to prevent the delivery of tailored
          in-application advertisements. We do not control how the applicable
          platform operator allows you to manage personalized in-application
          advertisements. You should review your device manufacturer&apos;s
          support materials and/or the device settings for the respective
          operating systems for more detail on how to manage such preferences.
        </p>

        <p>
          You may opt out of location data collection on our mobile app(s) by
          managing your location preferences in the &quot;My Account&quot;
          section of that app, or by disabling the GPS services for that app on
          your mobile device. You can stop all collection of Personal
          Information by a mobile app by uninstalling our app.
        </p>

        <h2 className="font-extrabold">Third-Party Online Services</h2>

        <p>
          The Services may contain links to third party services. These other
          sites may collect information about you and use this information in
          accordance with their own privacy policies and terms of service. We do
          not control those third parties&apos; policies or practices.
        </p>

        <h2 className="font-extrabold">Google Maps</h2>

        <p>
          If you use Google Maps / Google Earth as part of the Services, you
          agree to comply with the Google Maps / Google Earth Additional Terms
          of Service (including the{" "}
          <a
            href="https://www.google.com/intl/en_us/help/terms_maps/"
            rel="noopener noreferrer"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View Google Privacy Policy"
          >
            Google Privacy Policy
          </a>
          ). Further, you agree that Google, and not us, shall be responsible
          for any of your information Google receives as a result of your use of
          Google Maps / Google Earth.
        </p>

        <h2 className="font-extrabold">How We Protect Your Information</h2>

        <p>
          We maintain organizational, technical, and physical safeguards to help
          protect the Personal Information we collect and use. These safeguards
          vary depending upon a variety of factors including the sensitivity of
          the information we collect and use. Despite all reasonable practices,
          no security method is infallible.
        </p>

        <h2 className="font-extrabold">
          Changes and updates to the Privacy Notice
        </h2>

        <p>
          As our organization, membership and benefits change from time to time,
          this Privacy Notice is expected to change as well. We reserve the
          right to amend the Privacy Notice at any time, for any reason, without
          notice to you, other than the posting of the amended Privacy Notice
          and{" "}
          <a
            href="/terms-of-sale"
            target="_blank"
            className="btnAction text-blue-600 hover:text-blue-900 hover:underline"
            data-btn-action="View Terms of Sale"
          >
            Terms of Sale
          </a>{" "}
          at this Website. We may e-mail periodic reminders of our notices and
          terms and conditions and may e-mail you of material changes, but you
          should check our Website frequently to see the current Privacy Notice
          that is in effect and any changes that may have been made to it. The
          provisions contained herein supersede all previous notices or
          statements regarding our privacy practices and the use of the Website.
        </p>

        <h2 className="font-extrabold">
          Contacting Us Regarding This Privacy Notice
        </h2>

        <p>
          If you have any questions about this Privacy Notice, the practices of
          this Website, or your dealings with this Website, or if you think that
          anyone has violated this Privacy Notice, please contact us at:
        </p>

        <h2 className="font-extrabold">Webmaster</h2>

        <address>
          <ul>
            <li>Wurth Louis and Company</li>
            <li>895 Columbia Street</li>
            <li>Brea CA 92821</li>
            <li>
              <strong>websupport@wurthlac.com</strong>
            </li>
            <li>
              Phone:
              <a
                href="tel:18004224389"
                className="btnAction text-blue-500 hover:text-blue-900 hover:underline"
                data-btn-action="Click Privacy Policy Phone"
              >
                1-800-422-4389
              </a>{" "}
              x1014
            </li>
          </ul>
        </address>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
