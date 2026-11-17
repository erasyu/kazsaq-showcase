import { Navigate, Route, Routes } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import { Hub } from "./pages/Hub";
import { DalaCoffee } from "./pages/demos/DalaCoffee";
import { AruBeauty } from "./pages/demos/AruBeauty";

export default function App() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/demo/dala-coffee" element={<DalaCoffee />} />
        <Route path="/demo/aru-beauty" element={<AruBeauty />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  );
}
