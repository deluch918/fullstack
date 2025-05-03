import Entry from "./Entry";

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => (
        <Entry key={person.id} person={person} handleDelete={props.handleDelete} />
      ))}
    </div>
  );
};

export default Persons;
