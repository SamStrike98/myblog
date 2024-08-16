'use client'

import { useState } from "react"
import DesktopProject from "./DesktopProject";
import MobileProject from "./MobileProject";

const ProjectItem = () => {
    const [isMobile, setIsMobile] = useState(false);
    return (
        <div>
            {!isMobile ?
                <DesktopProject />
                :
                <MobileProject />
            }
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Mobile</span>
                    <input type="checkbox" className="toggle" value={isMobile} onChange={() => setIsMobile(!isMobile)} />
                </label>
            </div>
        </div>
    )
}

export default ProjectItem