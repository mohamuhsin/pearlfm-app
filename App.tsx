import { registerRootComponent } from "expo";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return <RootNavigator />;
}

registerRootComponent(App);
