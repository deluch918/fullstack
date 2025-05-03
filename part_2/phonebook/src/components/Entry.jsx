const Entry = (props) => {
  return (
    
    <div>
      {props.person.name} {props.person.number}
      <button onClick={() => props.handleDelete(props.person.id, props.person.name)}>
          Delete
      </button>
    </div>
  );
};

export default Entry;
