export default function WorkoutCard(props) {
    const {trainingPlan, workoutIndex, type, dayNum, icon} = props;
    const {warmup, workout} = trainingPlan || {};

    return (
        <div clasName="workout-container">
            <div className="workout-card card">
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} Workout</b></h2>
                </div>
            </div>
        </div>
    )
}