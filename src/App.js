import InitialQuizController from "./controller/InitialQuizController.js";

class App {
    async run() {
        const controller = new InitialQuizController();
        await controller.run();
    }
}

export default App;