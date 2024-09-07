import MainDashSkin from "@/components/mainDashboardSkin";
import SideNavbar from "@/components/sideNavBar";

export default function dashboard() {
    return(
        <div className="flex h-screen bg-blue-500">
            <SideNavbar />
            <MainDashSkin />
        </div>
    )
}