import { Flex } from "@chakra-ui/react";
import BackgroundBox from "./BackgroundBox";
import { SvgBackground } from "./graphic_components/BG";
import LoginPage from "./Pages/LoginPage";
import "./App2.css";
const App2 = () => {
  return (
    <Flex
      position="relative"
      w="100%"
      h="100%"
      bg="black"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <SvgBackground />
      <ExampleAppScreen />
      <BackgroundBox />
    </Flex>
  );
};
function ExampleAppScreen() {
  return (
    <>
      <div
        className="example-screen"
        zIndex="99999999999"
        alignSelf="center"
        justifySelf="center"
        w="50vw"
        maxW="20em"
        h="70vh"
        maxH="35em"
        bg="white"
        borderRadius="1em"
      >
        <LoginPage />
      </div>
    </>
  );
}
export default App2;
