import { Button } from "@/components/ui/button";
import { WORKFLOW_ITEMS } from "@/lib/workflow-constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="my-8">
        <div className="card-bg mb-6 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="md:mr-8">
            <h1 className="text-4xl font-semibold mb-8">PLM Products</h1>
            {/* TODO: Change text */}
            <div className="md:max-w-4xl space-y-8 font-light leading-7">
              <p>
                During the search for PLM solutions, our Operations Director 
                discovered plm.show, a sleek and fully-functional PLM SaaS 
                product that made all other options seem like clunky relics 
                from the past.
              </p>

              <p>
                As they delved deeper into the capabilities of plm.show, they
                realized they needed a reliable method for capturing,
                validating, and loading product information and supplier data 
                into the system.
              </p>

              <p>
                With Flatfile, the team had the ability to configure a variety
                of data onboarding options, from long-term onboarding projects
                to an ongoing file feed from a supplier. Thanks to Flatfile, the
                Operations Director was able to streamline their various data 
                onboarding workflows and elevate their product game.
              </p>

              <p>You can view the code for this app on Github.</p>

              <a
                className="button-bg"
                href="https://github.com/FlatFilers/products-show"
                target="_blank"
              >
                <span className="mr-4">View on Github</span>
                <img src="/images/github-white.svg" />
              </a>
            </div>
          </div>

          <span className="text-5xl">📦</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(WORKFLOW_ITEMS).map((key) => {
            const item = WORKFLOW_ITEMS[key as keyof typeof WORKFLOW_ITEMS];

            return (
              <Link
                key={item.slug}
                href={item.href}
                className={`card-bg flex flex-col justify-between space-y-6 border-2 border-transparent ${item.highlightColor} rounded-xl p-6 transform hover:scale-[101%] transition duration-200`}
              >
                <div className="">
                  <div className="flex flex-row items-center mb-2">
                    <img src={item.imageUri} className="mr-3" />
                    <p className="text-xl font-semibold">{item.name}</p>
                  </div>

                  <div
                    className={`mb-6 border-t-[2px] w-[20px] ${item.color}`}
                  ></div>

                  <p className="leading-8">{item.description}</p>
                </div>
                <div>
                  <Button>Open {item.name}</Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
