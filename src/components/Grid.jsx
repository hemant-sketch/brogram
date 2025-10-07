import {workoutProgram as training_plan} from '../utils/index.js'
import WorkoutCard from "./WorkoutCard.jsx";
import {useState, useEffect} from "react";

export default function Grid() {
    const[savedWorkouts, setSavedWorkouts] = useState(null);
    const[selectedWorkout, setSelectedWorkout] = useState(null);   //for modals to show
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val];
        return entry.isComplete;
    });

    

    function handleSave(index, data) {
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }
        setSavedWorkouts(newObj);
        localStorage.setItem('irondays', JSON.stringify(newObj));
        setSelectedWorkout("null");
    }

    function handleComplete(index, data) {
        const newObj = {...data};
        newObj.isComplete = true;
        handleSave(index, newObj);
    }
    
    useEffect(()=> {
        if(!localStorage) {
            return;
        }
        let savedData = {};
        if(localStorage.getItem('irondays')) {
           savedData = JSON.parse(localStorage.getItem('irondays')); 
        }
        setSavedWorkouts(savedData);
    }, [])

    return ( 
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = workoutIndex === 0 ?
                false :
                !completedWorkouts.includes(`${workoutIndex - 1}`);
                console.log(workoutIndex, isLocked);

                const type = workoutIndex % 3 === 0 ? "Push" : workoutIndex % 3 === 1 ? "Pull" : "Legs";
                const trainingPlan = training_plan[workoutIndex];  //trainingPlan for that particular day
                const dayNum = ((workoutIndex /8 ) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1;
                const icon = workoutIndex % 3 === 0 ? (
                                <i className="fa-solid fa-dumbbell"/>
                            ) : (
                                workoutIndex % 3 === 1 ? (
                                    <i className="fa-solid fa-weight-hanging"/>
                                ) : (
                                    <i className="fa-solid fa-bolt"></i>
                                )
                            )
                
                if(selectedWorkout === workoutIndex) {
                    return (
                        <WorkoutCard 
                        savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                        handleSave={handleSave}
                        handleComplete={handleComplete}
                        key={workoutIndex} 
                        trainingPlan={trainingPlan} 
                        type={type} 
                        workoutIndex={workoutIndex} 
                        dayNum={dayNum}
                        icon={icon}/>
                    )
                }
                return (
                    <button onClick={() => {
                        if(isLocked) {return};
                        setSelectedWorkout(workoutIndex);
                        }}
                        
                        className={'card plan-card '+ (isLocked ? 'inactive' : '')} key={workoutIndex}>

                        <div className="plan-card-header">
                            <p>Day {dayNum}</p>
                        </div>

                        {isLocked ? (
                            <i className="fa-solid fa-lock"/>
                        ) : (icon)}

                        <div className="plan-card-header">
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
