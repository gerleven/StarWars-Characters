import { CustomButtonPrimary, CustomButtonSecondary } from "../utils/custom-buttons";
import { Form } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>Home Page!</div>
      <Form method="get" action="/new" replace>
        <CustomButtonPrimary type="submit">New Character</CustomButtonPrimary>
        <CustomButtonSecondary>New Character</CustomButtonSecondary>
      </Form>
    </>
  );
};

export default HomePage;
