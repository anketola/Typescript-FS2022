// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CourseDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case "normal":
      return(
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong><br /><i>{part.description}</i></p>
        </div>
      )
    case "groupProject":
    return(
      <p><strong>{part.name} {part.exerciseCount}</strong> <br />
      project exercises {part.groupProjectCount} </p>
    )
    case "submission":
    return(
      <div>
          <p><strong>{part.name} {part.exerciseCount}</strong><br />
          <i>{part.description}</i><br />submit to {part.exerciseSubmissionLink} </p>
      </div>
    )
    case "special":
    return(
      <p><strong>{part.name} {part.exerciseCount}</strong> <br />
      <i>{part.description}</i> <br />
      required skills: {part.requirements.join(", ")} </p>
    )
    default:
      return assertNever(part);
  }
}

interface CoursePartsList {
  coursePartsList: Array<CoursePart>;
}

const Content = ({ coursePartsList }: CoursePartsList ) => {
  return (
    <div>
      {coursePartsList.map((part) => <Part part={part} key={part.name} />)}
    </div>
  )
}

const Total = ({ total }: { total: number }) => {
  return (
    <p>
      Number of exercises{" "}
      {total}
    </p>
    
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content coursePartsList={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  )
};

export default App;