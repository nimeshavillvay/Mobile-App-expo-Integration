import type { Metadata } from "next";
import { MainTitle } from "../_components/main-title";

export const metadata: Metadata = {
  title: "Supply Chain",
};

const SupplyChainPage = () => {
  return (
    <section className="container mt-8 text-gray-700 [&>p]:mb-4">
      <MainTitle>
        Supply Chain Challenges: Why Buy from Wurth Louis and Company?
      </MainTitle>
      <h2 className="mb-2 font-wurth text-xl font-bold">
        We Are Your Most Reliable Supplier for All of Your Machinery and Supply
        Needs
      </h2>
      <p>
        Although we are trying to put the pandemic in the rear view mirror, many
        issues that started because of shut downs, shipping delays and raw
        materials shortages are having a dramatic impact on how businesses can
        quickly fulfill orders. The machine industry is no exception. Many of
        our suppliers are experiencing longer lead times which delay products
        getting to our facilities and ultimately to you the end user.
      </p>
      <p>
        Navigating out-of-stock issues can be a pain especially if you use just
        one brand of your most commonly used products. But, luckily, we are here
        to help. We have huge buying power and are always at the top of
        fulfillment queues, meaning we get product much faster and in bigger
        quantities than many other suppliers.
      </p>
      <p>
        As an alternative, we have options for substitutes for many of your most
        commonly purchased items. If your favorite brand is out of stock, we are
        here to help you choose the best possible replacement.
      </p>
      <p>
        Don&apos;t want to substitute? Take our advice and place your order now
        so you are in queue for when shipments are received. Many lead times are
        averaging only 2-4 weeks. In fact, you may want to stock up now and be
        in the best possible inventory position when orders start shipping in
        our normal lead times.
      </p>{" "}
    </section>
  );
};

export default SupplyChainPage;
