# Webflow Code Component Examples

A collection of projects demonstrating how to bring code components built in React into Webflow via DevLink. Each example is a self-contained project that showcases different patterns and use cases for building interactive components that seamlessly integrate with Webflow. You can run a Devlink CLI command that will import the component into Webflow so you can try it on your Webflow sites.

## DevLink

DevLink is a tool to bridge Webflow and external code. This repo showcases how to create and bring your own custom, interactive React components directly in the Webflow canvas as Webflow Components via [Shared Libraries](https://webflow.com/updates/libraries).

Here are some reasons why you may want to import your custom React components into Webflow:

- **Custom functionality** beyond Webflow's built-in elements
- **Interactive UI** with complex state management
- **Data-driven components** whose bound props can be configured via the Webflow canvas or at runtime
- **Reusable components** can be shared across multiple Webflow sites

## 📁 Available Examples

You can navigate into individual projects in this repo to copy, make tweaks, and import pre-made example components into Webflow.

### 🧮 [Pricing Quote Calculator](./pricing-quote-calculator/)

A pricing calculator to output an insurance premium featuring:

- **Multi-input form logic** with validation
- **URL parameter support** for pre-filling form inputs with default state
- **Responsive design and Tailwind styling** with [DaisyUI](https://daisyui.com/)

### 📝 [Multi-Step Form](./multistep-form/)

A dynamic form generator demonstrating:

- **Step-by-step navigation** with progress tracking
- **Dynamic field generation** based on configuration
- **Form validation and submission** and error handling
- **Conditional logic** for showing/hiding fields
- **Data persistence** across steps

### 🗺️ [Store Locator](./store-locator/)

A map component and backend API that plots locations demonstrating:

- **Webflow Cloud** Setup a secure backend to call protected API endpoints from your component
- **JWT Auth** Add a JWT as a prop in your component to access protected content
- **Webflow CMS API** get locations already listed in the Webflow CMS
- **Mapbox Integration** geo-locate a users input and get map tiles
- **Leaflet.js** A lightweight, open-source mapping library

## 🧩 [Shadcn/ui Components](./shadcn-components/)

A list of base Shadcn/ui components adapted for Webflow code components:

- **Base building block components** with props exposed for Webflow
- **Tailwind styling**

## 🚀 Getting Started

Navigate inside a project example folder (i.e. `cd pricing-quote-calculator`) and follow the `README` inside to install the project, run it locally, and import it to Webflow.

## 📖 Documentation Links

Learn more about how importing code components into Webflow works alongside details to consider when prepping React components for Webflow compatibility.

- [Webflow Code Components Documentation](https://developers.webflow.com/code-components/introduction)
- [Component Architecture Guide](https://developers.webflow.com/code-components/component-architecture)
- [Prop Types Reference](https://developers.webflow.com/code-components/reference/prop-types)
- [Styling Components](https://developers.webflow.com/code-components/styling-components)

## 🤝 Contributing

1. **Create a new example** in its own directory; fork this repo to make your own copy
2. **Follow the established patterns** for file structure by looking at existing examples in this repo
3. **Include comprehensive documentation** in the example's README
4. **Test thoroughly** before submitting
5. **Add the example** to this main README
6. **Create a pull request** from your fork of the repo to the `main` branch

## ❓ Questions / Issues

Running into problems trying out one of the examples? Create an issue in the [Issues tab](https://github.com/Webflow-Examples/code-components-examples/issues).
