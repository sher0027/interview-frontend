import Navbar from "../components/Navbar";
import Background from "../components/Background";
import EvaluationList from "../components/EvaluationList";

const Evaluation = () => {
    return (
        <>
            <Navbar />
            <Background>
                <EvaluationList></EvaluationList>
            </Background>
        </>
    )
}
export default Evaluation;