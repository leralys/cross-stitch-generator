import { useTranslation } from 'react-i18next';

export function Welcome() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto space-y-8 p-4">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {t('appName')}
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            {t('appDescription')}
          </p>
          <button className="rounded-lg bg-primary px-8 py-3 text-white transition-colors hover:bg-primary/90">
            {t('actions.create')}
          </button>
        </section>

        {/* Features Section */}
        {/* <section className="py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20"></div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Feature {i}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Content Sections for Scroll Testing */}
        {/* {[1, 2, 3, 4, 5].map(section => (
          <section key={section} className="py-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Section {section}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(paragraph => (
                <p
                  key={paragraph}
                  className="leading-relaxed text-gray-600 dark:text-gray-300"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Card {section}A
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Some additional content to make the page longer and test
                  scrolling behavior.
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Card {section}B
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  More content to ensure we have enough scroll height to test
                  the header.
                </p>
              </div>
            </div>
          </section>
        ))} */}

        {/* Footer Section */}
        {/* <section className="border-t border-gray-200 py-16 text-center dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            End of temporary content - you can now test scrolling!
          </p>
        </section> */}
      </div>
    </main>
  );
}
