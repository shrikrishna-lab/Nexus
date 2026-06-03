import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { AuthGate } from "@/features/auth/AuthGate";
import { ArminPage } from "@/features/armin/ArminPage";
import { ConnectPage } from "@/features/connect/ConnectPage";
import { FuturePage } from "@/features/future/FuturePage";
import { ProgressPage } from "@/features/progress/ProgressPage";
import { PromptPage } from "@/features/prompts/PromptPage";
import { StashPage } from "@/features/stash/StashPage";
import { WorkspacePage } from "@/features/workspaces/WorkspacePage";
import { SettingsPage } from "@/features/SettingsPage";

export function App() {
  const location = useLocation();

  return (
    <AuthGate>
      <Layout>
        <div key={location.pathname} className="h-full animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/workspaces" replace />} />
            <Route path="/workspaces" element={<WorkspacePage />} />
            <Route path="/workspaces/:workspaceId" element={<WorkspacePage />} />
            <Route path="/prompts" element={<PromptPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/stash" element={<StashPage />} />
            <Route path="/future" element={<FuturePage />} />
            <Route path="/armin" element={<ArminPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </Layout>
    </AuthGate>
  );
}
