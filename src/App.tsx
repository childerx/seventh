import "./App.css";
import { Toaster } from "sonner";
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
      <Toaster richColors position="top-right" closeButton />
    </ThemeProvider>
  );
}

export default App;
