import { Container } from "react-bootstrap";
import NewArrivals from "../components/NewArrivals";
import Banner from "../components/Banner";
import Subs from "../components/Subs";
import { Toaster } from "sonner";

const HomePage = () => {
  return (
    <>
      <Toaster richColors />
      <Banner />
      <Container fluid>
        <NewArrivals />
        <Subs />
      </Container>
    </>
  );
};

export default HomePage;
