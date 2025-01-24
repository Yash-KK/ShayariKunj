import Quote from "../components/Quote";
import Register from "../components/Auth/Register";
export default function SignUp() {
  return (
    <div className="grid grid-cols-2">
      <Register />
      <Quote />
    </div>
  );
}
