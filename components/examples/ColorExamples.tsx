/**
 * Example component showing how to use the custom colors
 * This file demonstrates the color system
 */

export function ColorExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Color System Examples</h1>
      
      {/* Primary Color */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Primary Color (#D04607)</h2>
        <div className="flex gap-4">
          <div className="bg-primary text-white p-4 rounded-lg">
            Primary
          </div>
          <div className="bg-primary-dark text-white p-4 rounded-lg">
            Primary Dark
          </div>
          <div className="bg-primary-light text-white p-4 rounded-lg">
            Primary Light
          </div>
        </div>
      </section>

      {/* Secondary Color */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Secondary Color (#0E1C8C)</h2>
        <div className="flex gap-4">
          <div className="bg-secondary text-white p-4 rounded-lg">
            Secondary
          </div>
          <div className="bg-secondary-dark text-white p-4 rounded-lg">
            Secondary Dark
          </div>
          <div className="bg-secondary-light text-white p-4 rounded-lg">
            Secondary Light
          </div>
        </div>
      </section>

      {/* Tertiary Color */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tertiary Color (#2FE90A)</h2>
        <div className="flex gap-4">
          <div className="bg-tertiary text-black p-4 rounded-lg">
            Tertiary
          </div>
          <div className="bg-tertiary-dark text-black p-4 rounded-lg">
            Tertiary Dark
          </div>
          <div className="bg-tertiary-light text-black p-4 rounded-lg">
            Tertiary Light
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors">
            Primary Button
          </button>
          <button className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-lg transition-colors">
            Secondary Button
          </button>
          <button className="bg-tertiary hover:bg-tertiary-light text-black px-6 py-3 rounded-lg transition-colors">
            Tertiary Button
          </button>
        </div>
      </section>

      {/* Dark Mode Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dark Mode Support</h2>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-900 dark:text-white">
            This card adapts to light and dark themes automatically.
          </p>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <h1 className="text-5xl">Heading 1 (Poppins)</h1>
        <h2 className="text-4xl">Heading 2 (Poppins)</h2>
        <h3 className="text-3xl">Heading 3 (Poppins)</h3>
        <p className="text-lg">
          Body text uses Inter font. This is a paragraph with some example text
          to demonstrate the typography system.
        </p>
      </section>
    </div>
  );
}

