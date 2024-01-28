import './App.css';

function Age(props) {
    const {age,gender} = props
    const handleNull = () => {
       if (age === null){
        age = true
       }
       if (gender ===   null){
        gender = true
       }
        

    }

  return (
    <div className="age"> 
        {age ? (<><h1>Age: You are {age} years old</h1></>): (<h1>Couldn't make a prediction for your age</h1>) }
        <br></br>
        {gender ? (<><h1>Gender: You are {gender}</h1></>): (<h1>Couldn't make a prediction for your gender</h1>) }
        
    </div>
  );
}

export default Age;
