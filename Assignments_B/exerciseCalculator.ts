interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }


const calculateExercises = (daily: Array<number>, target: number): ExerciseResults => {
    const periodLength = daily.length;
    let trainingDays = 0
    let totalHours = 0
    let success;
    daily.forEach((element) => {
        if (element > 0) {
            trainingDays += 1;
            totalHours += element;
        }
    });
    const average = totalHours / 7;
    let rating;
    let ratingDescription;
    if (average >= target) {
        success = true;
    } else {
        success = false;
    }
    if (success) {
        rating = 3;
        ratingDescription = "You achieved your goal!";
    } else if (!success && trainingDays > 4) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "Keep trying!"
    }

    return {   
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));