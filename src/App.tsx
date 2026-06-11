import "./App.css";
import NotificationProvider from "./notifications";
import RoutesProvider from "./router";
import LayoutProvider from "./layout";
import { ThemeProvider } from "./context/theme-context";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <RoutesProvider>
          <LayoutProvider />
        </RoutesProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
