import Navbar from "../components/Navbar";
import Background from "../components/Background";
import ResumeInfo from "../components/ResumeInfo";

const Resume = () => {
    return(
        <>
            <Navbar />
            <Background>
                <ResumeInfo></ResumeInfo>
            </Background>
        </>
    )
}
export default Resume;