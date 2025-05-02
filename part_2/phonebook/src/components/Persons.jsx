import Entry from "./Entry";

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => (
        <Entry key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
