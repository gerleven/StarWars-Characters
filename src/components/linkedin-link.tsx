export interface ILinkedinLink{
    dataSize?: "medium" | "large";
    dataTheme?: "dark" | "light";
    dataType?: "VERTICAL" | "HORIZONTAL";
    showLink?: boolean
}



const LinkedinLink=({dataSize = "large", dataTheme = "light", dataType = "HORIZONTAL", showLink = false}: ILinkedinLink)=>{
    
    return (
        <>
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size={dataSize} data-theme={dataTheme} data-type={dataType} data-vanity="german-levental" data-version="v1">
                {showLink && (<a className="badge-base__link LI-simple-link" href="https://ar.linkedin.com/in/german-levental?trk=profile-badge">Germán Levental</a>)}
            </div>
        </>
    );
};

export default LinkedinLink;