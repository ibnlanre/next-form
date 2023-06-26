import { ChangeEvent, ComponentProps, FormEvent, useState } from "react";

interface LoginForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

type FormNames = keyof LoginForm;
interface FieldSetProps extends ComponentProps<"input"> {
  label: string;
  name: FormNames;
}

function FieldSet({ onChange, label, name, type = "text" }: FieldSetProps) {
  return (
    <fieldset className="flex gap-3">
      <label htmlFor="first_name">{label}</label>
      <input
        className="flex-1 border border-black rounded-sm"
        type={type}
        name={name}
        onChange={onChange}
        
      />
    </fieldset>
  );
}

export default function Home() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<LoginForm>();

  // console.log(register);

  const [form, setForm] = useState<LoginForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const body = new FormData();

    Object.entries(form).forEach(([name, value]) => {
      body.set(name, value);
    });

    fetch("api/login", {
      method: "POST",
      body,
    });
  };

  return (
    <form
      className="grid max-w-screen-sm gap-6 mx-auto my-24"
      onSubmit={handleSubmit}
    >
      <FieldSet label="First Name" name="first_name" onChange={handleChange} />
      <FieldSet label="Last Name" name="last_name" onChange={handleChange} />
      <FieldSet
        label="Email"
        name="email"
        onChange={handleChange}
        type="email"
      />
      <FieldSet
        label="Phone Number"
        name="phone_number"
        onChange={handleChange}
      />
      <button className="text-white bg-black rounded-sm">Submit</button>
    </form>
  );
}
