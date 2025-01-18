import Quote from "../components/Quote";
import SignUpForm from "../components/SignUpForm";
export default function SignUp() {
  return (
    <div className="grid grid-cols-2">
      <SignUpForm />
      <Quote />
    </div>
  );
}
