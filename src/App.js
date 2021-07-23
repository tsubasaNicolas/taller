import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import InfoProvider from "./info/InfoProvider";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <InfoProvider>
          <AppRouter />
        </InfoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
