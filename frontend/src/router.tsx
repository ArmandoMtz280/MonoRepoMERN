import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectsView from "./views/projects/CreateProjectsView"
import EdithProjectView from "./views/projects/EdithProjectView";

export default function Router() {
    return(
        <BrowserRouter>
           <Routes>
              <Route element={<AppLayout />}>
                 <Route path="/" element={<DashboardView />} index/>
                 <Route path="/projects/create" element={<CreateProjectsView />}/>
                 <Route path="/projects/:projectId/edit" element={<EdithProjectView />}/>
              </Route>
           </Routes>
        </BrowserRouter>
    );
}