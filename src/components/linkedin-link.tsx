import { useEffect } from "react";

export interface ILinkedinLink{
    dataSize?: "medium" | "large";
    dataTheme?: "dark" | "light";
    dataType?: "VERTICAL" | "HORIZONTAL";
    showLink?: boolean
}



const LinkedinLink= ({dataSize = "large", dataTheme = "light", dataType = "HORIZONTAL", showLink = false}: ILinkedinLink)=>{
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        script.defer = true;
        script.type = "text/javascript";
        document.body.appendChild(script);
    
        // Limpiar el script al desmontar el componente
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      
    return (
        <>
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size={dataSize} data-theme={dataTheme} data-type={dataType} data-vanity="german-levental" data-version="v1">
                {showLink && (<a className="badge-base__link LI-simple-link" href="https://ar.linkedin.com/in/german-levental?trk=profile-badge">Germán Levental</a>)}
            </div>
        </>
    );
};

export default LinkedinLink;