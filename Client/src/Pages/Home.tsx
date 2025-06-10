
import { Outlet } from "react-router-dom";

import { Navigation } from '../components/Navigation';

export default function Home() {

  return (
   
    <div className="min-h-screen">
       <Navigation/>
        <Outlet />
    </div>
  );
}
