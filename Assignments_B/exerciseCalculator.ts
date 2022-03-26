interface ExerciseParams {
    target: number;
    daily: Array<number>;
}

interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseParams => {
    if (args.length < 4) throw new Error("Not enough arguments");
    let target;
    if ( isNaN(Number(args[2])) ) {
        throw new Error("Target argument has to be given as a number");
    } else {
        target = Number(args[2]);
    }
    const givenHours = args.slice(3);
    if ( givenHours.filter(hour => isNaN(Number(hour))).length > 0) {
        throw new Error("Exercise hours has to be given as numbers");
    }
    
    return {
        target: target,
        daily: givenHours.map((hour) => Number(hour))
    };
};


export const calculateExercises = (target: number, daily: Array<number>): ExerciseResults => {
    const periodLength = daily.length;
    let trainingDays = 0;
    let totalHours = 0;
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
    if (success) {
        rating = 3;
        ratingDescription = "You achieved your goal!";
    } else if (!success && trainingDays > 4) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "Keep trying!";
    }

    return {   
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, daily } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, daily));
} catch (e) {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
    console.log("Whoopsie! An error occured, message: ", e.message);
    console.log("Please give as arguments first the target hours followed by done daily exercise hours");
}