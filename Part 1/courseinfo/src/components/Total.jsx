const Total = (props) => {
    return (
      <>
        <p>
          <b>Number of exercises {props.parts.reduce((sum, prop) => sum + prop.exercises, 0)}</b>
        </p>
      </>
    )
  }

  export default Total