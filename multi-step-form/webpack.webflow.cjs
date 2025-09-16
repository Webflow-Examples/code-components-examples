module.exports = {
  mode: "development",
  module: {
    // Override the existing rules to modify CSS processing
    rules: (currentRules) => {
      return currentRules.map((rule) => {
        // Find the rule that handles CSS files
        if (
          rule.test instanceof RegExp &&
          rule.test.test("test.css") &&
          Array.isArray(rule.use)
        ) {
          for (const [index, loader] of rule.use.entries()) {
            // Find the css-loader
            if (typeof loader === "object" && loader?.ident === "css-loader") {
              // Preserve existing options and add a custom configuration
              const options =
                typeof loader.options === "object" ? loader.options : {};
              rule.use[index] = {
                ...loader,
                options: {
                  ...options,
                  modules: {
                    exportLocalsConvention: "as-is", // Use original class names
                    namedExport: false, // ⚠️ Allow dot notation access
                  },
                },
              };
            }
          }
        }
        return rule;
      });
    },
  },
};
