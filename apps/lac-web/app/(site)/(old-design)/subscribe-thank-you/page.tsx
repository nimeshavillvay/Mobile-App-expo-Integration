import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";

export const metadata: Metadata = {
  title: "Subscribe Thank You",
};

const SubscribeThankYouPage = () => {
  return (
    <section className="container mt-8 text-gray-800 [&>p]:mb-4">
      <MainTitle>Thank You for Subscribing</MainTitle>
      <p>
        Thank you for subscribing to receive our{" "}
        <strong>Promotions and Special Offers</strong>.
      </p>
      <p>
        An email will be sent to you shortly to Confirm your Opt-In request to
        join our mailing list. After you click the &quot;Confirm email
        address&quot; link in the email, you will be added to the list to be the
        first to receive our emailed promotions and special offers.
      </p>
      <p>
        If you receive the Confirmation email and have decided not to subscribe,
        simply ignore or delete the message and you will not be added to our
        list. You will not receive further requests unless you subscribe again.
      </p>
      <p>
        You may unsubscribe anytime or change your email preferences by clicking
        the &quot;Unsubscribe&quot; link at the bottom of any email you receive
        from us.
      </p>
    </section>
  );
};

export default SubscribeThankYouPage;
