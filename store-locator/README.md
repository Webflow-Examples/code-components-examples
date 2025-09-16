# Webflow Store Locator: Code Component & Cloud API Example

This project is a complete, deployable example of a Webflow Code Component powered by a backend API hosted on Webflow Cloud. It provides a full-featured "Store Locator" that can be dropped into any Webflow site, configured visually, and powered by your Webflow CMS data.

## Overview

This repository contains two main parts:

1.  **A React-based Code Component (`/src/components/StoreLocator`)**:

    - A reusable UI for finding and displaying store locations on a map.
    - A Setup UI to configure backend API Requests
    - The frontend UI is adapted for Webflow using `@webflow/react` in `StoreLocator.webflow.tsx`, allowing designers to configure it visually through props in the Designer.
    - Built with Leaflet for map rendering.

2.  **An Astro-based Backend API (`/src/pages/api`)**:
    - Designed to be deployed seamlessly to [Webflow Cloud](https://developers.webflow.com/webflow-cloud/getting-started).
    - Provides secure, server-side access to your Webflow CMS data and Mapbox API keys.
    - Features a simple setup UI to configure sites, collections, and generate a secure JWT for the frontend component.

## How It Works

The separation between the frontend component and the backend API ensures that sensitive information like your Webflow API Token and Mapbox API Key are never exposed to the browser.

1.  **Setup**: A user visits the deployed backend's `/setup` page, authenticates with Webflow, selects a site and CMS Collection, and enters their Mapbox key.
2.  **Token Generation**: The setup page generates a JSON Web Token (JWT). This token contains the `siteId`, `collectionId`, and the Mapbox key, signed securely by the server.
3.  **Component Configuration**: The developer copies this JWT and pastes it into the component's `Auth Token` prop in the Webflow Designer. The `API Base URL` is also set to the deployed backend's URL.
4.  **Live Usage**: When a visitor views the live site, the Store Locator component uses the JWT to make secure calls to the backend API. The backend validates the token and proxies requests to the Webflow CMS and Mapbox, returning only the necessary data.

---

## Getting Started

Follow these steps to set up the backend on Webflow Cloud and publish the Code Component to your Webflow workspace.

### Prerequisites

- A [Webflow](https://webflow.com/) account (Workspace plan required for Libraries).
- A [GitHub](https://github.com/) account.
- A [Mapbox](https://mapbox.com/) account and a public access token.
- [Node.js](https://nodejs.org/) (v20.0.0 or higher).
- The [Webflow CLI](https://developers.webflow.com/webflow-cloud/getting-started#1-install-the-webflow-cli) installed locally to your project: `npm install @webflow/webflow-cli`

### Part 1: Backend Setup (Webflow Cloud)

#### 1. Clone & Install Dependencies

Clone this repository to your local machine and install the necessary npm packages.

```bash
git clone https://github.com/webflow-examples/store-locator.git
cd store-locator
npm install
```

#### 2. Webflow CMS Setup

In your Webflow site, create a new CMS Collection with the following details:

- **Collection Name**: `Locations`
- **Collection Slug**: `locations`

Add the following fields to the collection. The `slug` field is the unique identifier used by the application.

| Field Name  | Field Type     | Required | Help Text                         |
| :---------- | :------------- | :------- | :-------------------------------- |
| `Name`      | `Plain Text`   | Yes      | The name of the store or location |
| `Address`   | `Plain Text`   | Yes      | Full street address for geocoding |
| `Phone`     | `Phone Number` | No       | Contact phone number              |
| `Latitude`  | `Number`       | No       | Will be auto-generated            |
| `Longitude` | `Number`       | No       | Will be auto-generated            |

> **Note:** The `Latitude` and `Longitude` fields are optional. If an address is provided without coordinates, the backend will automatically geocode it using Mapbox and store the results.

#### 3. Environment Variables

This project uses a `.dev.vars` file for local development and Cloudflare secrets for production. Create a `.dev.vars` file in the root of your project by copying the example:

```bash
cp .dev.vars.example .dev.vars
```

Fill in the required values:

- `WEBFLOW_CLIENT_ID` & `WEBFLOW_CLIENT_SECRET`: Get these by creating a new Webflow App under your Workspace settings. Set the Redirect URI to `[YOUR_DEPLOYED_URL]/api/auth/oauth2/callback/webflow`.
- `BETTER_AUTH_SECRET`: A long, random string you create to sign JWTs.
- `PUBLIC_BETTER_AUTH_URL`: The base URL where this app will be deployed (e.g., `https://my-site.webflow.io/map`).

When you deploy to Webflow Cloud, you will need to add these as Secrets in your Webflow Cloud dashboard, which is linked from your Site Settings -> Webflow Cloud tab.

#### 4. Deploy to Webflow Cloud

Follow the official [Webflow Cloud Getting Started Guide](https://developers.webflow.com/webflow-cloud/getting-started) to deploy this application. The key steps are:

1.  Push the cloned repository to your own new GitHub repository.
2.  In your Webflow Site Settings, go to the **Webflow Cloud** tab.
3.  Create a **New Project**, link your GitHub repo, and create an **Environment** (e.g., from your `main` branch).
4.  Set the **Mount Path** (e.g., `/map`). This is the subpath where your app will live.
5.  Configure your production secrets in the environment dashboard.

Once configured, Webflow Cloud will automatically deploy your application whenever you push to the connected branch.

### Part 2: Component Configuration

#### 1. Configure the Store Locator

Once your backend is deployed, navigate to its setup page (e.g., `https://my-site.webflow.io/map/setup`).

1.  **Login with Webflow**: Authenticate your account.
2.  **Select Site & Collection**: Choose the Webflow site and the `Locations` collection you created earlier.
3.  **Enter Mapbox Key**: Paste your public Mapbox access token.
4.  **Save & Generate Token**: Click the button to save your settings and generate the JWT.
5.  **Copy the Token**: Copy the generated auth token. You will need it in the Webflow Designer.

#### 2. Share Component to Webflow

Now, share the React component from your local machine to your Webflow workspace using the CLI.

```bash
npx webflow library share
```

This command bundles the component defined in `src/components/StoreLocator/StoreLocator.webflow.tsx` and makes it available as a shared library in your Webflow workspace.

> For more details, see the [Code Components Documentation](https://developers.webflow.com/code-components).

#### 3. Use the Component in the Webflow Designer

1.  Open your site in the Webflow Designer.
2.  Go to the **Libraries** panel and install the "Store Locator" library.
3.  Drag the **Store Locator** component from the **Component Panel** onto your canvas.
4.  With the component selected, go to the **Settings Panel**.
5.  Fill in the component props:
    - **API Base URL**: The URL of your deployed backend (e.g., `https://my-site.webflow.io/map`).
    - **Auth Token (JWT)**: Paste the token you generated in the setup UI.
    - **Map Style**: Choose a default Mapbox style.
    - **Distance Unit**: Choose Miles or Kilometers.
6.  Publish your site. Your Store Locator should now be live!

---

## Key Files

- `src/components/StoreLocator/StoreLocator.tsx`: The core React component logic.
- `src/components/StoreLocator/StoreLocator.webflow.tsx`: The Webflow declaration file that defines the component's props.
- `src/pages/api/locations.ts`: The secure API endpoint that fetches CMS items.
- `src/pages/api/geocode.ts`: The API endpoint for geocoding addresses via Mapbox.
- `src/pages/api/auth/generate-token.ts`: The endpoint that creates the secure JWT for the component.
- `src/middleware.ts`: Handles CORS and JWT validation for protected API routes.
- `src/lib/auth.ts`: Server-side authentication configuration using `better-auth`.
- `drizzle.config.ts` & `src/lib/db/schema.ts`: Database schema and configuration for D1.
