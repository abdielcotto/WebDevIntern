import './App.css';
import { useState, useEffect} from "react";
import axios from "axios";


function App() {
  //State
  const [kids, setKids] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    parentName: "",
  });

  // Use effect
  useEffect(() => {
    fetchKid();
  }, []);

  // Functions
  const fetchKid = async () => {
    // Fetch the kids
    const res = await axios.get("http://localhost:3001/kid");
    // Set to state
    setKids(res.data.kids);

    console.log(res);
    console.log(res.data.kids);
  };

  const updateCreateFormField = async (e) => {
    const {name, value} = e.target;
    console.log({name, value})
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createKid = async (e) => {
    e.preventDefault();
    // Create the kid
    const res = await axios.post("http://localhost:3001/kid", createForm);
    //Update state
    setKids([...kids, res.data.kid]);
    // Clear form state
    setCreateForm({name: '', parentName: ''});
  };

  const checkOutKid = async (_id) => {
    // Delete the kid
    const res = axios.delete(`http://localhost:3001/kid/${_id}`);
    console.log(res);
    // Update State
    const newKids = [...kids].filter(kid => {
      return kid._id !== _id;
    });
    setKids(newKids);
  }

  return (
    <div className="App">
     <div>
      <h2>Kids in Daycare:</h2>
      {kids && kids.map((kid) => {
        return (
        <div key={kid._id}>
          <h3>{kid.name}</h3>
          <button onClick={() => checkOutKid(kid._id)}>Check Out Kid</button>
        </div>
        );
      })}
     </div>

     <div>
      <h2>Check In Kid</h2>
      <form onSubmit={createKid}>
        <input
      
        onChange={updateCreateFormField}
        value={createForm.name}
        name="name"/>
        <textarea
        onChange={updateCreateFormField}
        value={createForm.parentName}
        name="parentName"/>
        <button type="submit">Check In</button>
      </form>
     </div>
    </div>
  );
}

export default App;
