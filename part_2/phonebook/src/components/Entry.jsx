const Entry = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
    </p>
  );
};

export default Entry;
