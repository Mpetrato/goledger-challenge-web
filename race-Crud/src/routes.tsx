import { Routes, Route, Navigate } from "react-router-dom";
import { CarPage } from "./pages/CarPage";
import { DriverPage } from "./pages/DriverPage";
import { EventPage } from "./pages/EventPage";
import { TeamPage } from "./pages/TeamPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/cars" element={<CarPage />} />
            <Route path="/drivers" element={<DriverPage />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/events" element={<EventPage />} />

            <Route path="*" element={<Navigate to={'/cars'}/>}/>
        </Routes>
    )
}