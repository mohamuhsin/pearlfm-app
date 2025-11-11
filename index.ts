/**
 * ============================================================
 *  📱 Pearl FM Mobile — Entry Point
 * ------------------------------------------------------------
 *  This file registers the root App component with Expo.
 *  It ensures the app environment, theming, and navigation
 *  are initialized before rendering the main interface.
 * ============================================================
 */
import { registerRootComponent } from "expo";
import App from "./App";

// ✅ Register root component for Expo & bare workflow compatibility
registerRootComponent(App);
