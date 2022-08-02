import { Routes, Route, Navigate } from "react-router-dom";
import { Table } from "./components/Table";
import { CarPage } from "./pages/CarPage";
import { DriverPage } from "./pages/DriverPage";
import { EventPage } from "./pages/EventPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/cars" element={<CarPage />} />
            <Route path="/drivers" element={<DriverPage />} />
            <Route path="/events" element={<EventPage />} />

            <Route path="*" element={<Navigate to={'/cars'}/>}/>
        </Routes>
    )
}