import Navbar from "../components/Navbar";
import Background from "../components/Background";
import EvaluationList from "../components/EvaluationList";

const Evaluation = () => {
    return (
        <>
            <Navbar />
            <Background>
                <EvaluationList eid="1"/>
            </Background>
        </>
    )
}
export default Evaluation;