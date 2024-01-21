import { Outlet } from "react-router-dom";

const RootPage = () => {
    return <>
    <div>Root Page!</div>
    <Outlet />
    </>
}

export default RootPage;